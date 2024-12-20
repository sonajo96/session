const{DataTypes, STRING}=require("sequelize");
const{sequelize}=require("../config/database")


  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mobile:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports=User;