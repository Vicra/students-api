const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
});

async function register(student) {
    return knex('students').insert({
        name: student.name,
        age: student.age ? student.age : null,
        email: student.email,
        password: student.encryptedPassword,
        salt: student.salt
    });
}

async function getStudents() {
    const students = JSON.parse(
        JSON.stringify(
            await knex.select()
                .table('students')
        )
    );
    const studentsReturn = students.slice();
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        const classes = await getEnrolledClasses(student.id);
        studentsReturn[i].classes = classes;
    }
    return studentsReturn;
}

async function getEnrolledClasses(studentId) {
    const classes = [];
    const studentsClasses = JSON.parse(JSON.stringify(await knex.select()
        .table('students_classes')
        .where('student_id', studentId)));

    for (let i = 0; i < studentsClasses.length; i++) {
        const enrolledClass = JSON.parse(
            JSON.stringify(
                await knex.select()
                    .table('classes')
                    .where('id', studentsClasses[i].class_id)
            )
        );
        if (enrolledClass.length)
            classes.push(enrolledClass[0].name);
    }
    return classes;
}

async function createStudent(student) {
    return knex('students').insert({
        name: student.name,
        age: student.age ? student.age : null
    });
}

async function getStudentById(id) {
    const student = JSON.parse(
        JSON.stringify(
            await knex.select()
                .table('students')
                .where('id', id)
        )
    );
    return student;
}

async function deleteStudentById(id) {
    return await knex('students')
        .where('id', id)
        .del();
}

async function updateStudent(id, student) {
    await knex('students')
        .where('id', '=', id)
        .update({
            name: student.name,
            age: student.age
        });
    return;
}

// exposure to outside
module.exports = {
    getStudents,
    getStudentById,
    deleteStudentById,
    createStudent,
    updateStudent,
    register
};