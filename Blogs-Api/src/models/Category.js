module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: DataTypes.STRING,
    }, {
        underscored: true,
        timestamps: false,
    });

    // Category.associate = (models) => {
    //     Category.belongsToMany(models.post_categories, {
    //         foreignKey: 'category_id',
    //         as: "posts_categories"
    //     });
    // }
    return Category;
}