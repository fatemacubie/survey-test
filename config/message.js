const errorMessages = {
    INVALID_ID: 'Invalid ID provided.',
    INVALID_INPUT: 'Invalid input provided.',
    INVALID_DATE: 'Invalid date format.',
    DATABASE_ERROR: 'Error accessing the database.',
    AUTHENTICATION_ERROR: 'Authentication failed.',
    UNAUTHORIZED_ACCESS: 'Unauthorized access.',
    INTERNAL_SERVER_ERROR: 'Internal server error.',
    DUPLICATE_ENTRY: 'Duplicate entry found.',
    DATA_NOT_FOUND: 'Data not found.',
    ID_NOT_FOUND: 'ID not found.',
    FILE_UPLOAD_FAILED: 'File upload failed.',
    FILE_MISSING: 'File not attached.',
    FILE_NOT_FOUND: 'File not uploaded.',
};
const successMessages = {
    OPERATION_SUCCESSFUL: 'Operation successful.',
    DATA_RETRIEVED: 'Data retrieved successfully.',
    USER_CREATED: 'User created successfully.',
    DATA_UPLOADED_SUCCESSFUL: 'Data uploaded successfully.',
    UPDATE_SUCCESSFUL: 'Update successful.',
    DELETE_SUCCESSFUL: 'Delete successful.',
    AUTHENTICATION_SUCCESSFUL: 'Authentication successful.',
};

module.exports = { errorMessages, successMessages };
