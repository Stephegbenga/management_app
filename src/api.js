import {message as toast} from "antd";

const base_url = "https://managament-app-backend.onrender.com";

const upload_file = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(base_url + "/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.message;
      toast.error(errorMessage);
      return;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    toast.error(error.message);
  }
};





const get_product_names = async () => {
    try {
      const response = await fetch(`${base_url}/product_name`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.message;
        toast.error(errorMessage);
        return
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  };


  const save_new_product_name = async (product_name) => {
    try {
      const response = await fetch(`${base_url}/product_name`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: product_name}),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.message;
        toast.error(errorMessage);
        return 
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  }

  


export {upload_file, get_product_names, save_new_product_name};
