const { sequelize, Sequelize } = require('../index');

const tableName = 'articles';
const Articles = sequelize.define(tableName, {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
    },
    content: {
        type: Sequelize.STRING,
    },
    createBy: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName
});

// SiteGroup.associate = function(models) {
//     SiteGroup.hasMany(models.Site);
// };
module.exports = Articles;
