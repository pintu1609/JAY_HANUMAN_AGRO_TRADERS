const { pool } = require('../db/db');

// /**
//  * CREATE ONE
//  */
// exports.create = async (table, data) => {
//   const keys = Object.keys(data);
//   const values = Object.values(data);

//   const columns = keys.join(', ');
//   const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

//   const query = `
//     INSERT INTO ${table} (${columns})
//     VALUES (${placeholders})
//     RETURNING *
//   `;

//   const { rows } = await pool.query(query, values);
//   return rows[0];
// };

// /**
//  * CREATE MANY
//  */
// exports.createMany = async (table, dataArray) => {
//   if (!dataArray.length) return [];

//   const keys = Object.keys(dataArray[0]);
//   const columns = keys.join(', ');

//   const values = [];
//   const placeholders = dataArray
//     .map((row, i) => {
//       const offset = i * keys.length;
//       values.push(...Object.values(row));
//       return `(${keys.map((_, j) => `$${offset + j + 1}`).join(', ')})`;
//     })
//     .join(', ');

//   const query = `
//     INSERT INTO ${table} (${columns})
//     VALUES ${placeholders}
//     RETURNING *
//   `;

//   const { rows } = await pool.query(query, values);
//   return rows;
// };

// /**
//  * FIND (with pagination & sort)
//  */
// exports.find = async (
//   table,
//   where = {},
//   pagination = {},
//   sort = {}
// ) => {
//   const conditions = [];
//   const values = [];

//   Object.entries(where).forEach(([key, value], i) => {
//     conditions.push(`${key} = $${i + 1}`);
//     values.push(value);
//   });

//   let query = `SELECT * FROM ${table}`;
//   if (conditions.length) {
//     query += ` WHERE ${conditions.join(' AND ')}`;
//   }

//   if (Object.keys(sort).length) {
//     const order = Object.entries(sort)
//       .map(([k, v]) => `${k} ${v === -1 ? 'DESC' : 'ASC'}`)
//       .join(', ');
//     query += ` ORDER BY ${order}`;
//   }

//   if (pagination.limit) query += ` LIMIT ${pagination.limit}`;
//   if (pagination.skip) query += ` OFFSET ${pagination.skip}`;

//   const { rows } = await pool.query(query, values);
//   return rows;
// };

// /**
//  * FIND ONE
//  */
// exports.findOne = async (table, where = {}) => {
//   const keys = Object.keys(where);
//   const values = Object.values(where);

//   const conditions = keys
//     .map((k, i) => `${k} = $${i + 1}`)
//     .join(' AND ');

//   const query = `
//     SELECT * FROM ${table}
//     WHERE ${conditions}
//     LIMIT 1
//   `;

//   const { rows } = await pool.query(query, values);
//   return rows[0] || null;
// };

// /**
//  * FIND BY ID
//  */
// exports.findById = async (table, id) => {
//   const { rows } = await pool.query(
//     `SELECT * FROM ${table} WHERE id = $1`,
//     [id]
//   );
//   return rows[0] || null;
// };

// /**
//  * COUNT
//  */
// exports.count = async (table, where = {}) => {
//   const keys = Object.keys(where);
//   const values = Object.values(where);

//   let query = `SELECT COUNT(*) FROM ${table}`;

//   if (keys.length) {
//     const conditions = keys
//       .map((k, i) => `${k} = $${i + 1}`)
//       .join(' AND ');
//     query += ` WHERE ${conditions}`;
//   }

//   const { rows } = await pool.query(query, values);
//   return Number(rows[0].count);
// };

// /**
//  * UPDATE ONE
//  */
// exports.updateOne = async (table, where, data) => {
//   const setKeys = Object.keys(data);
//   const whereKeys = Object.keys(where);

//   const setClause = setKeys
//     .map((k, i) => `${k} = $${i + 1}`)
//     .join(', ');

//   const whereClause = whereKeys
//     .map((k, i) => `${k} = $${setKeys.length + i + 1}`)
//     .join(' AND ');

//   const values = [...Object.values(data), ...Object.values(where)];

//   const query = `
//     UPDATE ${table}
//     SET ${setClause}
//     WHERE ${whereClause}
//     RETURNING *
//   `;

//   const { rows } = await pool.query(query, values);
//   return rows[0] || null;
// };

// /**
//  * UPDATE MANY
//  */
// exports.updateMany = async (table, where, data) => {
//   const setKeys = Object.keys(data);
//   const whereKeys = Object.keys(where);

//   const setClause = setKeys
//     .map((k, i) => `${k} = $${i + 1}`)
//     .join(', ');

//   const whereClause = whereKeys
//     .map((k, i) => `${k} = $${setKeys.length + i + 1}`)
//     .join(' AND ');

//   const values = [...Object.values(data), ...Object.values(where)];

//   const query = `
//     UPDATE ${table}
//     SET ${setClause}
//     WHERE ${whereClause}
//   `;

//   const result = await pool.query(query, values);
//   return result.rowCount;
// };

// /**
//  * DELETE ONE
//  */
// exports.deleteOne = async (table, where) => {
//   const keys = Object.keys(where);
//   const values = Object.values(where);

//   const conditions = keys
//     .map((k, i) => `${k} = $${i + 1}`)
//     .join(' AND ');

//   const query = `
//     DELETE FROM ${table}
//     WHERE ${conditions}
//     RETURNING *
//   `;

//   const { rows } = await pool.query(query, values);
//   return rows[0] || null;
// };

// /**
//  * DELETE MANY
//  */
// exports.deleteMany = async (table, where) => {
//   const keys = Object.keys(where);
//   const values = Object.values(where);

//   const conditions = keys
//     .map((k, i) => `${k} = $${i + 1}`)
//     .join(' AND ');

//   const result = await pool.query(
//     `DELETE FROM ${table} WHERE ${conditions}`,
//     values
//   );

//   return result.rowCount;
// };



exports.create = async (model, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  const query = `
    INSERT INTO ${model.table} (${keys.join(', ')})
    VALUES (${keys.map((_, i) => `$${i + 1}`).join(', ')})
    RETURNING *
  `;

  const { rows } = await pool.query(query, values);
  return rows[0];
};

exports.findOne = async (model, where) => {
  const keys = Object.keys(where);
  const values = Object.values(where);

  const query = `
    SELECT * FROM ${model.table}
    WHERE ${keys.map((k, i) => `${k} = $${i + 1}`).join(' AND ')}
    LIMIT 1
  `;

  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};

exports.find = async (model) => {
  const { rows } = await pool.query(`SELECT * FROM ${model.table}`);
  return rows;
};

exports.findByID = async (model, id) => {
  const { rows } = await pool.query(
    `SELECT * FROM ${model.table} WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
};

exports.findOneAndUpdate = async (model, where, data) => {
  const setKeys = Object.keys(data);
  const values = Object.values(data);

  const query = `
    UPDATE ${model.table}
    SET ${setKeys.map((k, i) => `${k} = $${i + 1}`).join(', ')}
    WHERE ${Object.keys(where).map((k, i) =>
      `${k} = $${setKeys.length + i + 1}`
    ).join(' AND ')}
    RETURNING *
  `;

  const { rows } = await pool.query(query, [...values, ...Object.values(where)]);
  return rows[0];
};

exports.findOneAndDelete = async (model, where) => {
  const keys = Object.keys(where);
  const values = Object.values(where);

  const query = `
    DELETE FROM ${model.table}
    WHERE ${keys.map((k, i) => `${k} = $${i + 1}`).join(' AND ')}
    RETURNING *
  `;

  const { rows } = await pool.query(query, values);
  return rows[0];
};


exports.findOneExcludeId = async (model, column, value, excludeId) => {
  if (!model.table) throw new Error("DAL Error: table is undefined");

  const query = `
    SELECT *
    FROM ${model.table}
    WHERE ${column} = $1
      AND id <> $2
    LIMIT 1
  `;

  const { rows } = await pool.query(query, [value, excludeId]);
  return rows[0] || null;
};