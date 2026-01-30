import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Devices', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true
    },
    heritage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    employee: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'NetworkDatas',
        key: 'ip',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'Devices',
    timestamps: true
  });

// Associação: Devices pertence a NetworkDatas pelo campo ip
// (deve ser chamada após todos os models serem carregados)
 function associate(db) {
  db.Devices.belongsTo(db.NetworkDatas, {
    foreignKey: 'ip',
    targetKey: 'ip',
    as: 'networkData',
    constraints: false // pois ip não é PK em NetworkDatas
  });
}
};