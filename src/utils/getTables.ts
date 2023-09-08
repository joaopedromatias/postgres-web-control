import { Sequelize } from 'sequelize'

export const getTables = async (sequelize: Sequelize) => {
  if (sequelize) {
    const tablesInformation = await sequelize.query(
      `SELECT * FROM pg_catalog.pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')`
    )
    return tablesInformation
  }
  return []
}
