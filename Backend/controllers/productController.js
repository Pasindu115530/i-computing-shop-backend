import Product from "../models/Product.js";

export function createProduct(req, res) {
    if (!req.user || req.user.role !== "admin") {
        res.status(403).json({
            message: "Forbidden",
        });
        return;
    }

    // Check if productID is provided
    if (!req.body.productID) {
        res.status(400).json({
            message: "productID is required",
        });
        return;
    }

    const product = new Product(req.body);

    product
        .save()
        .then(() => {
            res.json({
                message: "Product created successfully",
            });
        })
        .catch((error) => {
            if (error.code === 11000) {
                res.status(400).json({
                    message: "Product with this ID already exists",
                    error: "Duplicate productID",
                });
            } else if (error.name === 'ValidationError') {
                res.status(400).json({
                    message: "Validation error",
                    error: error.message,
                });
            } else {
                res.status(500).json({
                    message: "Error creating product",
                    error: error.message,
                });
            }
        });
}

export function getAllProducts(req, res) {
    if (req.user && req.user.role === "admin") {
        Product.find()
            .then((products) => {
                res.json(products);
            })
            .catch((error) => {
                res.status(500).json({
                    message: "Error fetching products",
                    error: error.message,
                });
            });
    } else {
        Product.find({ isAvailable: true })
            .then((products) => {
                res.json(products);
            })
            .catch((error) => {
                res.status(500).json({
                    message: "Error fetching products",
                    error: error.message,
                });
            });
    }
}

export function deleteProduct(req, res) {
    if (!req.user || req.user.role !== "admin") {
        res.status(403).json({
            message: "Only admin can delete products"
        });
        return;
    }

    const productID = req.params.productID

    Product.deleteOne({ productID: productID })
        .then((result) => {
            if (result.deletedCount === 0) {
                res.status(404).json({
                    message: "Product not found"
                });
            } else {
                res.json({
                    message: "Product deleted successfully"
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error deleting product",
                error: error.message
            });
        });
}

export function updateProduct(req, res) {
    if (!req.user || req.user.role !== "admin") {
        res.status(403).json({
            message: "Only admin can update products"
        });
        return;
    }

    const productID = req.params.productID;

    Product.updateOne({ productID: productID }, req.body)
        .then((result) => {
            if (result.matchedCount === 0) {
                res.status(404).json({
                    message: "Product not found"
                });
            } else {
                res.json({
                    message: "Product updated successfully"
                });
            }
        })
        .catch((error) => {
            if (error.code === 11000) {
                res.status(400).json({
                    message: "Cannot update to duplicate productID",
                    error: error.message,
                });
            } else {
                res.status(500).json({
                    message: "Error updating product",
                    error: error.message
                });
            }
        });
}

export function getProductByID(req, res) {
    const productID = req.params.productID;

    Product.findOne({ productID: productID })
        .then((product) => {
            if (product == null) {
                res.status(404).json({
                    message: "Product not found"
                });
            } else {
                if (product.isAvailable) {
                    res.json(product);
                } else {
                    if (isAdmin(req)) {
                        res.json(product);
                    } else {
                        res.status(404).json({
                            message: "Product not found"
                        });
                    }
                }
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error fetching product",
                error: error.message
            });
        });
}