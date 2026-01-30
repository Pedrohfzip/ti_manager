'use strict';

module.exports = (sequelize, DataTypes) => {
  const NetworkData = sequelize.define('NetworkData', {
    ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mac: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hostname: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'NetworkDatas',
    timestamps: true
  });

  return NetworkData;
};
