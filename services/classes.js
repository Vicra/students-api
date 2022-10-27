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

async function getClasses() {
    const classes = JSON.parse(
        JSON.stringify(
            await knex.select()
                .table('classes')
        )
    );
    return classes;
}


async function createClass(classObj) {
    return knex('classes').insert({
        name: classObj.name,
        age: classObj.age ? classObj.age : null
    });
}

async function getClassById(id) {
    const classObj = JSON.parse(
        JSON.stringify(
            await knex.select()
                .table('classes')
                .where('id', id)
        )
    );
    return classObj;
}

async function deleteClassById(id) {
    return await knex('classes')
        .where('id', id)
        .del();
}

async function updateClass(id, classObj) {
    await knex('classes')
        .where('id', '=', id)
        .update({
            name: classObj.name,
            age: classObj.age
        });
    return;
}

// exposure to outside
module.exports = {
    getClasses,
    getClassById,
    deleteClassById,
    createClass,
    updateClass
};