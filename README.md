## <a href="https://emoji.gg/emoji/46886-sogsneer"><img src="https://cdn3.emoji.gg/emojis/46886-sogsneer.png" width="20px" height="20px" alt="SOGSneer"></a> **SOLODLE** <a href="https://emoji.gg/emoji/46886-sogsneer"><img src="https://cdn3.emoji.gg/emojis/46886-sogsneer.png" width="35px" height="35px" alt="SOGSneer"></a>

Esta API permite obtener información sobre los personajes de _Solo Leveling_, incluyendo sus atributos, habilidades y características clave.

## 🌍 **Base URL:**

https://solodleapi.up.railway.app/api/characters

## 🔐 **Autenticación**

Todos los endpoints requieren autenticación mediante un **token JWT**. Para usarlos, agrega el siguiente encabezado en tus peticiones (solo peticiones de lectura):

JSON

```json
1 - Debera iniciar sesión:

Método: POST

URL: http://localhost:3000/auth/login

Body (raw, JSON):

  {
  "username": "public_user",
  "password": "130203"
  }   

Respuesta: Obtendrás un token en la respuesta.

2 - Usar el token:

Método: GET

URL: http://localhost:3000/characters

Headers:

Authorization: Bearer <token>

-----------------------

En cURL:

1 - Iniciar sesión:

curl -X POST http://localhost:3000/auth/login \

-H "Content-Type: application/json" \

-d '{"username":  "public_user",  "password":  "130203"}'

Respuesta: Obtendrás un token en la respuesta.

2 - Usar el token:

curl -X GET http://localhost:3000/characters \

-H "Authorization: Bearer <token>"
```

----------

## 🚀 **Características principales:**

✅ Obtener la lista de personajes. ✅ Consultar detalles de un personaje en específico. ✅ Filtrar personajes por atributos o habilidades. ✅ Administrar personajes (crear, actualizar y eliminar solo roles de admin).

----------

## 🛠 **Endpoints Principales**

### 📌 **1. Obtener todos los personajes | atributos**

**Método:**  `GET`  **URL:**  `/characters | /attributes`  **Descripción:** Devuelve una lista con todos los personajes / atributos. **Respuesta esperada:**

JSON

```json
Personajes:
    {
        "id": 1,
        "name": "Sung Jin-Woo",
        "gender": "Masculino",
        "species": "Humano",
        "affiliation": "Gremio de cazadores Ahjin",
        "image": "https://res.cloudinary.com/drk2lotrs/image/upload/v1740544431/solo-leveling-characters/mdmiwklsxm8s8juwhsl2.webp",
        "main_weapon": [
            "Dagas"
        ],
        "image_150x150": "https://res.cloudinary.com/drk2lotrs/image/upload/v1741575134/solo-leveling-150x150/ppnkkmecublrua8wxrht.webp"
    },
    {
        "id": 2,
        "name": "Cha Hae-In",
        "gender": "Femenino",
        "species": "Humano",
        "affiliation": "Gremio de Cazadores",
        "image": "https://res.cloudinary.com/drk2lotrs/image/upload/v1740544431/solo-leveling-characters/m3zsmormv6jags7w44us.webp",
        "main_weapon": [
            "Espada"
        ],
        "image_150x150": "https://res.cloudinary.com/drk2lotrs/image/upload/v1741575609/solo-leveling-150x150/pxktb3n6zgl0pca9nf2p.webp"
    }...
-----------------------------------------------------------
Atributos:
 {
    "id": 1,
    "name": "Sombra",
    "description": "Manipulación de sombras y control de ejércitos."
  },
  {
    "id": 2,
    "name": "Fuerza",
    "description": "Increíble fuerza física."
  }...
```

----------

### 📌 **2. Obtener un personaje por ID / atributo**

**Método:**  `GET`  **URL:**  `/characters/{id} | /attributes/:id`  **Descripción:** Devuelve los detalles de un personaje específico. **Ejemplo de respuesta (****`/characters/1 | /attributes/1`****):**

JSON

```json
Personaje:
    {
        "id": 1,
        "name": "Sung Jin-Woo",
        "gender": "Masculino",
        "species": "Humano",
        "affiliation": "Gremio de cazadores Ahjin",
        "image": "https://res.cloudinary.com/drk2lotrs/image/upload/v1740544431/solo-leveling-characters/mdmiwklsxm8s8juwhsl2.webp",
        "main_weapon": [
            "Dagas"
        ],
        "image_150x150": "https://res.cloudinary.com/drk2lotrs/image/upload/v1741575134/solo-leveling-150x150/ppnkkmecublrua8wxrht.webp"
    }
----------------------------------------------------
Atributo:
  {
    "id": 1,
    "name": "Sombra",
    "description": "Manipulación de sombras y control de ejércitos."
  }
```

----------

### 📌 **3. Buscar personajes por atributo**

**Método:**  `GET`  **URL:**  `/characters/attribute/:id/attributes`  **Descripción:** Obtiene todos los atributos de un personaje especifico por su ID**:**

JSON

```json
  {
    "id":  1,
    "name":  "Sombra",
    "description":  "Manipulación de sombras y control de ejércitos."
  },
  {
    "id":  2,
    "name":  "Fuerza",
    "description":  "Increíble fuerza física."
  },
  {
    "id":  3,
    "name":  "Velocidad",
    "description":  "Movimiento extremadamente rápido."
  }...
```

----------

### 📌 **4. Crear un nuevo personaje / atributo**

**Método:**  `POST`  **URL:**  `/characters | /attributes`  **Descripción:** Agrega un nuevo personaje a la base de datos. **Body (JSON):**

JSON

```json
Personaje:
  {
    "name":  "XX",
    "gender":  "Masculino / Femenino",
    "species":  "Humano / Insecto / Sombra / ...",
    "affiliation":  "Gremio de cazadores XX / Monarca / ...",
    "image":  "https://res.cloudinary.com/drk2lotrs/image/upload/v1740543717/solo-leveling-characters/wkxq4se5ahtcx1ozzhjt.webp"
    "main_weapon":  [
        "Daga", 
        "Espada", ...],
    "image_150x150":  "https://res.cloudinary.com/drk2lotrs/image/upload/v1741575134/solo-leveling-150x150/ppnkkmecublrua8wxrht.web"
  }

------------------------------------------------------
Atributo:
  {
    "name": "...",
    "description": "..."
  }
```

----------

### 📌 **5. Actualizar un personaje / atributo (SU PUEDE PASAR SOLO EL DATO QUE SE QUIERA CAMBIAR)**

**Método:**  `PATCH`  **URL:**  `/characters/{id} | /attributes/:id`  **Descripción:** Modifica la información de un personaje. **Body (JSON) (****`PUT /characters/1 | /attributes/1`****):**

JSON

```json
Personaje:
  {
    "name": "Sung Jin-Woo",
    "gender": "Masculino",
    "species": "Humano",
    "affiliation": "Gremio de cazadores Ahjin / Monarca", //dato actualizado
    "image": "https://res.cloudinary.com/drk2lotrs/image/upload/v1740543717/solo-leveling-characters/wkxq4se5ahtcx1ozzhjt.webp"
    "main_weapon": ["Dagas"], ["espadas"], ///dato actualizado
    "image_150x150": "https://res.cloudinary.com/drk2lotrs/image/upload/v1741575134/solo-leveling-150x150/ppnkkmecublrua8wxrht.web"
 }
------------------------------------------------------------------
Atributo:
  {
    "name": "Ejercito de sombras", //dato actualizado
    "description": "Manipulación de sombras y control de ejércitos."
  }
```

----------

### 📌 **6. Eliminar un personaje / atributo**

**Método:**  `DELETE`  **URL:**  `/characters/{id} | /attributes/:id`  **Descripción:** Elimina un personaje de la base de datos. **Respuesta esperada:**

JSON

```json
Personaje:
  {
    "message":  "Personaje eliminado"
  }
-------------------------------------
Atributo:
  {
    "message":  "Atributo eliminado"
  }
```

----------

## 📝 **Notas finales**

-   La API usa **JSON** como formato de respuesta.
    
-   Los datos se actualizan periódicamente para reflejar cambios en la historia.
    
-   Para reportar errores o sugerencias, contacta con el equipo de desarrollo.
