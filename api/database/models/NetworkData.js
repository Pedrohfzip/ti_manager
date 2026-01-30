import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('NetworkDatas', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
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
    tableName: 'NetworkDatas',
    timestamps: true
  });
};



// 'use strict';

// module.exports = (sequelize, DataTypes) => {
//   const NetworkData = sequelize.define('NetworkData', {
//     ip: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     mac: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     hostname: {
//       type: DataTypes.STRING,
//       allowNull: true
//     }
//   }, {
//     tableName: 'NetworkDatas',
//     timestamps: true
//   });

//   return NetworkData;
// };
