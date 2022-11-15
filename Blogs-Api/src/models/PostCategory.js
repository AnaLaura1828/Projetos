module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: { type: DataTypes.INTEGER, primaryKey: true },
        categoryId: { type: DataTypes.INTEGER, primaryKey: true },
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'posts_categories'
    });
 
    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, {
            foreignKey: 'postId',
            otherKey: 'categoryId',
            as: "categories",
            through: PostCategory,
        });
        models.Category.belongsToMany(models.BlogPost, {
            foreignKey: 'categoryId',
            as: 'posts',
            otherKey: 'postId',
            through: PostCategory,
        })
    }
    return PostCategory;
}