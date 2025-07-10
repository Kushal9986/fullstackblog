import { useForm } from "react-hook-form";
import { Button, Input, Rte, Select } from "./index.js";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Controller } from "react-hook-form";
import { getCookie } from "./index.js";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, control, setValue, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.id || "",
            content: post?.content || "",
            status: post?.status || "active",
            // image:post?.image || ""
        },
    });


    const navigate = useNavigate();
    // const [image, setImage] = useState();
    const userData = useSelector((state) => state.auth.userData)
    //for setting post.userid  == logged in user id




    const submit = async (data) => {
        // console.log("post:: Existing:: ",post)
        // console.log("data .image::", data.image)
        // console.log("type of file",typeof(data.image[0]))
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append("status", data.status);


        if (data.image && data.image.length > 0 && data.image[0] instanceof File) {
            formData.append("image", data.image[0]); // ✅ real file
        }
        if (post) {
            formData.append("id", post.id);
            formData.append("userid", post.userid);
            // for (let [key, value] of formData.entries()) {
            //     console.log(`${key}:`, value);
            // }
            // if(data.image.length == 0){
            //     data.image = post.image
            //     console.log("data::imgae afte::",data.image)
            // }
            // console.log("data::",data)
            fetch(`https://fullstackblog-ff5v.onrender.com/api/updatearticles/${post.id}`,
                {
                    method: "PATCH",
                    headers:{
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                    body: formData,
                }
            )
                .then(async (Response) => {
                    if (!Response.ok) {
                        const response = await Response.json()
                        console.log("reponse::", response)
                        //     return Response.json().then(error=>{

                        //     throw new Error(error.message || 'Server error');
                        //    })
                    }
                    return Response.json()
                })
                .then((postdata) => {
                    console.log("postdata;", postdata)
                    if (postdata) {
                        navigate(`/post/${post.id}`)
                    }

                })
        }
        else {
            formData.append("id", data.slug);
            formData.append("userid", userData.id);
            // for (let [key, value] of formData.entries()) {
            //     console.log(`${key}:`, value);
            // }

            fetch("https://fullstackblog-ff5v.onrender.com/api/createarticles/", {
                method: "POST",
                headers:{
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                body: formData
            })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then(error => {
                            throw new Error(error.message || "server error")
                        })
                    }
                    // console.log("inside response:::")
                    // console.log("response::", response)
                    return response.json()
                })
                .then((postdata) => {
                    console.log("inside postdata::")
                    console.log("postdata:", postdata)
                    if (postdata) {
                        navigate(`/post/${postdata.id}`)
                    }
                })
        }

    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            console.log("watch::", watch)
            console.log("value:", value)
            console.log("name:", name)
            console.log("typeof value::", typeof (value))
            console.log("type of name :: is ", typeof (name))
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap justify-center align-center">
            <div className="px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", {
                        required: "Title is Required"
                    })}
                />
                {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: "slug is required" })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>}

                <Controller
                    name="content"
                    control={control}
                    rules={{
                        validate: value => {
                            const stripped = value.replace(/<[^>]+>/g, '').trim();
                            return stripped.length > 0 || "Content is required";
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <>
                            <Rte
                                label="Content:"
                                name="content"
                                control={control}
                                defaultValue={getValues("content")}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                            )}
                        </>
                    )}
                />

                {/* <Rte label="Content :" name="content" control={control} defaultValue={getValues("content")}
                /> */}
                {/* {errors.content && (
        <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
      )} */}

            </div>
            <div className="px-2">
                {/* <Input
                    label="image :"
                    type="file"
                    className="mb-4"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                /> */}
                {/* <Input
                    label="Image:"
                    type="file"
                    className="mb-4"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {
                        validate: (value) => {
                            console.log("value of image ::",value)
                            if (!post && (!value || value.length == 0)) {
                                return "Image is required";
                            }
                            return true;
                        }
                    })}
                /> */}

                <Input
                    label="Image:"
                    type="file"
                    className="mb-4"
                    {...register("image", {
                        validate: (value) => {
                            console.log("🔥 validate triggered", value);
                            if (!post && (!value || value.length === 0)) {
                                return "Image is required";
                            }
                            return true;
                        }
                    })}
                />

                {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                )}


                {post && (
                    <div className="w-full mb-4 justify-center align-center flex">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: "status is required" })}
                />

                {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>}
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}