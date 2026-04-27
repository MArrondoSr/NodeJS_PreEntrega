
console.log("Proyecto iniciado correctamente");

const metodo = process.argv[2];
const recurso = process.argv[3];


const borrarProducto = async (id) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log("Producto eliminado:");
        console.log(data);

    } catch (error) {
        console.error("Error:", error.message);
    }
};

const crearProducto = async (title, price, category) => {
    try {
        const productoBase = {
            title,
            price: Number(price),
            category
        };

        const nuevoProducto = {
            ...productoBase,
            description: "Producto creado desde consola",
            image: "https://i.pravatar.cc"
        };

        const response = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoProducto)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log("Producto creado:");
        console.log(data);

    } catch (error) {
        console.error("Error:", error.message);
    }
};

const obtenerProductoPorId = async (id) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const producto = await response.json();

        const { productId, title, price, category, image } = producto;

        console.log(`
ID: ${productId}
Título: ${title}
Precio: $${price}
Categoría: ${category}
Imagen: ${image}
-------------------------
`);

    } catch (error) {
        console.error("Error:", error.message);
    }
};

const obtenerProductos = async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        


        data.forEach((producto) => {
            
            const { id, title, price, category, image } = producto;
            console.log(`
ID: ${id}
Título: ${title}
Precio: $${price}
Categoría: ${category}
Imagen: ${image}
-------------------------
`);
        });

    } catch (error) {
        console.error("Error:", error.message);
    }
};

if (metodo === "GET") {

    if (recurso === "products") {
        obtenerProductos();

    } else if (recurso.startsWith("products/")) {
        const id = recurso.split("/")[1];
        obtenerProductoPorId(id);

    } else {
        console.log("Recurso no válido para GET.");
    }

} else if (metodo === "POST") {

    if (recurso === "products") {
        const title = process.argv[4];
        const price = process.argv[5];
        const category = process.argv[6];

        crearProducto(title, price, category);

    } else {
        console.log("Recurso no válido para POST.");
    }
}
    
    else if (metodo === "DELETE") {

    if (recurso.startsWith("products/")) {
        const id = recurso.split("/")[1];
        borrarProducto(id);

    } else {
        console.log("Debés indicar un ID. Ej: DELETE products/5");
    }

}

else {
    console.log("Comando no reconocido.");
}

