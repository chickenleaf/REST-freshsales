# Express.js Contact Management API

This Express.js application provides endpoints to manage contacts using either a CRM API or a MySQL database.

## Setup

1. **Install Dependencies**

   Make sure you have the following dependencies installed:
   ```
   npm install express body-parser axios mysql2 dotenv
   ```

2. **Create a `.env` File**

   Create a `.env` file in the root of your project with the following environment variables:

   ```
   PORT=3000
   CRM_BASE_URL=https://your-crm-api.com/contacts
   CRM_API_KEY=your-crm-api-key
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=contacts_db
   ```

3. **Run the Server**

   Start the server with:
   ```
   node index.js
   ```

## API Endpoints

### 1. Create a New Contact

- **URL:** `/contacts`
- **Method:** `POST`
- **Description:** Creates a new contact in either the CRM or the MySQL database.
- **Request Body:**
  ```
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "mobile_number": "1234567890",
    "data_store": "CRM" // or "DATABASE"
  }
  ```
- **Response:**
  - **Success (201 Created):**
    ```
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "mobile_number": "1234567890"
    }
    ```
  - **Error (400 Bad Request):** `"Invalid data_store value."`

### 2. Retrieve a Contact

- **URL:** `/contacts/:id`
- **Method:** `GET`
- **Description:** Retrieves a contact by ID from either the CRM or the MySQL database.
- **Query Parameters:**
  - `data_store` (string): `"CRM"` or `"DATABASE"`
- **Response:**
  - **Success (200 OK):**
    ```
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "mobile_number": "1234567890"
    }
    ```
  - **Error (404 Not Found):** `"Contact not found."`
  - **Error (400 Bad Request):** `"Invalid data_store value."`

### 3. Update a Contact

- **URL:** `/contacts/:id`
- **Method:** `PUT`
- **Description:** Updates a contact's email and mobile number in either the CRM or the MySQL database.
- **Request Body:**
  ```json
  {
    "new_email": "john.new@example.com",
    "new_mobile_number": "0987654321",
    "data_store": "CRM" // or "DATABASE"
  }
  ```
- **Response:**
  - **Success (200 OK):** `"Contact updated successfully."`
  - **Error (400 Bad Request):** `"Invalid data_store value."`

### 4. Delete a Contact

- **URL:** `/contacts/:id`
- **Method:** `DELETE`
- **Description:** Deletes a contact by ID from either the CRM or the MySQL database.
- **Query Parameters:**
  - `data_store` (string): `"CRM"` or `"DATABASE"`
- **Response:**
  - **Success (204 No Content):** No content is returned.
  - **Error (400 Bad Request):** `"Invalid data_store value."`

## Example Usage

1. **Create a Contact in CRM:**

   ```
   curl -X POST http://localhost:3000/contacts -H "Content-Type: application/json" -d '{
     "first_name": "Jane",
     "last_name": "Doe",
     "email": "jane.doe@example.com",
     "mobile_number": "9876543210",
     "data_store": "CRM"
   }'
   ```

2. **Retrieve a Contact from MySQL Database:**

   ```
   curl -X GET "http://localhost:3000/contacts/1?data_store=DATABASE"
   ```

3. **Update a Contact in CRM:**

   ```
   curl -X PUT http://localhost:3000/contacts/1 -H "Content-Type: application/json" -d '{
     "new_email": "jane.new@example.com",
     "new_mobile_number": "0123456789",
     "data_store": "CRM"
   }'
   ```

4. **Delete a Contact from MySQL Database:**

   ```
   curl -X DELETE "http://localhost:3000/contacts/1?data_store=DATABASE"
   ```

## Notes

- Ensure your CRM API and MySQL database are correctly configured and accessible.
- Update `.env` variables as needed based on your environment.

Feel free to modify the configuration and API details based on your specific needs.

This Markdown document includes setup instructions, API endpoint descriptions, and example usages for interacting with the server. Adjust the details as needed to match your actual environment and use cases.
