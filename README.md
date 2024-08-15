# 1. Create Contact
## Method: POST
**URL:** `http://localhost:3000/contacts`

**Body (JSON):**
```json
{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "mobile_number": "1234567890",
    "data_store": "CRM"  // Change to "DATABASE" to test MySQL
}
```

## Expected Response:
- **Success (CRM):** Status 201, with JSON data of the created contact.
- **Success (DATABASE):** Status 201, with JSON data including the new contact's `id`.
- **Error:** Status 400 for invalid `data_store` value.

# 2. Retrieve Contact
## Method: GET
**URL:** `http://localhost:3000/contacts/{id}?data_store=CRM`  // Change `data_store` to "DATABASE" to test MySQL

## Expected Response:
- **Success (CRM):** Status 200, with JSON data of the contact.
- **Success (DATABASE):** Status 200, with JSON data of the contact.
- **Error:** Status 404 if contact not found; Status 400 for invalid `data_store` value.

# 3. Update Contact
## Method: PUT
**URL:** `http://localhost:3000/contacts/{id}`

**Body (JSON):**
```json
{
    "new_email": "john.new@example.com",
    "new_mobile_number": "0987654321",
    "data_store": "CRM"  // Change to "DATABASE" to test MySQL
}
```

## Expected Response:
- **Success (CRM):** Status 200, with JSON data of the updated contact.
- **Success (DATABASE):** Status 200, with a success message.
- **Error:** Status 400 for invalid `data_store` value.

# 4. Delete Contact
## Method: DELETE
**URL:** `http://localhost:3000/contacts/{id}?data_store=CRM`  // Change `data_store` to "DATABASE" to test MySQL

## Expected Response:
- **Success (CRM):** Status 204, no content.
- **Success (DATABASE):** Status 204, no content.
- **Error:** Status 404 if contact not found; Status 400 for invalid `data_store` value.
```
