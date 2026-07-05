import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  //database version
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;
  //database minor version
  const databaseMinorVersionValue = databaseVersionValue
    .split(" ")[0]
    .split(".")[0];

  //database max connections
  const databaseMaxConnectionsResults = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResults.rows[0].max_connections;

  //database opened connections
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResults = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResults.rows[0].count;

  response.status(200).json({
    updated_at: updateAt,
    dependencies: {
      database: {
        version: databaseMinorVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        open_connections: parseInt(databaseOpenedConnectionsValue),
      },
    },
  });
}

export default status;
