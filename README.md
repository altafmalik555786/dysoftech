# Project Overview

This project utilizes a structured architecture combining frontend, backend, and a custom Domain-Specific Language (DSL) using JSON. The primary aim is to streamline the development process by defining project deployment and module creation within the JSON DSL.

## Root Directory Structure

- **View:** Frontend components (DyView)
- **Model:** Backend components (DyCore)
- **Controller:** JSON DSL for defining project logic and behavior

### Detailed Structure

**Controller: JSON DSL**

The JSON DSL is the heart of the project, defining forms and their respective components. The DSL encapsulates the Model, View, and Controller functions within a JSON structure.

#### JSON Structure

Each form is defined within a JSON file, named as `form_name.json`, which contains three primary sections:

1. **m:** Defines the form's model, including fields and data structures.
2. **v:** Specifies the form's view, handling UI-related aspects.
3. **c:** Contains the form's controller functions, dictating the behavior and logic.

### Components Breakdown

#### m: Form's Model

- **Fields `{}`**: Contains definitions for each field within the form, with nested components for detailed specifications.
  
  - **m: Fields Model**
    - Specifies the data structure, type, and validation rules for each field.

  - **v: Fields View**
    - Manages the presentation, layout, and interaction design of the fields.

  - **c: Fields Controller Functions**
    - Handles the logic, data manipulation, and business rules associated with the fields.

---

This architecture allows for a clear separation of concerns, ensuring that each aspect of the form—from data modeling to UI rendering and behavior control—is encapsulated within a single JSON file. This modular approach facilitates easy maintenance, scalability, and customization.
