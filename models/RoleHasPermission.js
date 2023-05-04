const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/conexion");
const Role = require("./Role");
const Permission = require("./Permission");

const RoleHasPermission = sequelize.define(
  "rolehaspermission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: "id",
      },
    },
    permissionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Permission,
        key: "id",
      },
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    tableName: "role_has_permissions",
  }
);

RoleHasPermission.belongsTo(Role, { foreignKey: "roleId" });
RoleHasPermission.belongsTo(Permission, { foreignKey: "permissionId" });

module.exports = RoleHasPermission;
