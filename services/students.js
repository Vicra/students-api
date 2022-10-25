const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'victor',
        password: 'abc123**',
        database: 'studentsdb'
    }
});

// TODO: get
async function getStudents() {
    const students = JSON.parse(
        JSON.stringify(
            await knex.select()
                .table('students')
        )
    );
    const studentsReturn = students.slice();
    students.map(async (student, index) => {
        students[index].classes = JSON.parse(JSON.stringify(await knex.select()
            .table('students_classes')
            .where('student_id', student.id)));

        students[index].classes.forEach(async (e) => {
            const classes = JSON.parse(JSON.stringify(await knex.select()
                .table('classes')
                .where('id', e.class_id)));
            console.log(classes);
            studentsReturn[index].classes = classes;
        });
    });
    return studentsReturn;
}

// TODO: create student
async function createStudent(student) {
    return knex('students').insert({
        name: student.name
    });
}

// TODO: crud

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

// exposure to outside
module.exports = {
    getStudents,
    getStudentById,
    deleteStudentById,
    createStudent
};