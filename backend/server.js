import app from "./app.js";
import cloudinary from "cloudinary";
const PORT = process.env.PORT;

cloudinary.v2.config({
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});

