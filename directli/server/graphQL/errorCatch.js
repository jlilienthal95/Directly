function errorCatch(e, table = "Unknown Table", type = "Unknown Operation", context = {}) {
    console.error(`Error in ${table} operation with type "${type}":`, e.message);
    if (Object.keys(context).length > 0) {
        console.error("Additional context:", context);
    }
    throw new Error(`Failed to ${type} on table ${table}. Original error: ${e.message}`);
}

module.exports = errorCatch;