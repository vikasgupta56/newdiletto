import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { uploadBytes, getDocs, collection, doc, updateDoc, getDoc, col, ref, db, storage, addDoc, uploadString, getDownloadURL } from '../../firebase.js'
import { AiOutlinePlus } from 'react-icons/ai'
import { FiEdit2, FiRefreshCcw } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Admin from '../Admin'
import swal from 'sweetalert';

const Category = ({ products, category, pointers, type }) => {

    const [cakes, setCakes] = useState(products)
    // type = type.split(" ")[0];
    // console.log(type);

    let searchWord = category.split(" ")[0];
    // console.log();

    let allproducts = [];

    let refresh = async () => {

        let docRef = doc(doc(db, 'cakesCategories', type), category, category);
        let docData = await getDoc(docRef);
        let docObj = docData.data();
        let pointers = docObj.pointers
        console.log(pointers);
        let tempproducts = [];

        await Promise.all(pointers.map(async (pointer) => {
            const docRef = doc(db, "all-cakes", pointer);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                let data = docSnap.data();
                data.id = pointer;
                tempproducts.push(data);
            }
        }))

        // console.log(tempproducts, "tempproducts");
        setCakes(tempproducts);
        // console.log(cakes, "cakes");

    }

    const addNewProducts = async () => {

        const querySnapshot = await getDocs(collection(db, "all-cakes"));
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            let product = doc.data();
            if (product.name.includes(searchWord) || product.name.includes(searchWord.toLowerCase())) {
                product.id = doc.id;
                allproducts.push(product);
            }
        });

        // console.log(allproducts, "allpe");
        console.log(pointers, "ae");
        for (let i = 0; i < allproducts.length; i++) {
            var found = false;
            for (let j = 0; j < pointers.length; j++) {
                if (allproducts[i].id === pointers[j]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                let point = allproducts[i].id;
                // console.log(point);
                pointers.push(point);
            }
        }
        console.log(pointers, "new pointer found");
        const docRef = doc(doc(db, 'cakesCategories', type), category, category);
        console.log(type, "->", category);

        await updateDoc(docRef, {
            pointers
        });

        refresh()



    }

    return (
        <>
            <Admin>
                <div className="products">
                    <div className="products-title">{category}</div>
                    <div className="products-outer-div">
                        <div className="upload-all flex-all t3" onClick={addNewProducts}>Update</div>
                        <div className="products-cont">
                            <div className="top-div">
                                <div className="top-img br1 tdd">Images</div>
                                <div className="top-name br1 tdd">Name</div>
                                <div className="top-price br1 tdd">Price</div>
                                <div className="top-cutprice br1 tdd">Cut Price</div>
                                <div className="top-minkg br1 tdd">Min kg</div>
                                <div className="top-edit tdd">Edit | Delete</div>
                            </div>
                            <div className="add-product">
                                <div className="global-img-cont br1 flex-all">
                                    {/* <input type="file" accept="image/*" onChange={selectFiles} multiple className='product-inp ' /> */}
                                    <div className="add-plus-cont pos-abs-full t3">
                                        <div className="add-plus flex-all"><AiOutlinePlus /></div>
                                        Add products
                                    </div>
                                    {/* </> */}
                                    {/* } */}
                                </div>
                              
                                <div className="product-edit flex-all" ></div>
                            </div>
                            {cakes.map((product, index) => {
                                return (
                                    <div key={index} className="product">
                                        <div className="product-img-cont br1 flex-all">
                                            <div className="product-img">
                                                <Image src={product.imgsrc} fill />
                                            </div>
                                        </div>
                                        <div className="product-name br1 flex-all">{product.name || undefined}</div>
                                        <div className="product-price br1 flex-all">{product.price || undefined}</div>
                                        <div className="product-cutprice br1 flex-all">{product.cutPrice || undefined}</div>
                                        <div className="product-minkg br1 flex-all">{product.minKg || undefined}</div>
                                        <div className="product-edit flex-all">
                                            <div className="edit-div flex-all"><FiEdit2 /></div>
                                            <div className="delete-div flex-all"><RiDeleteBin6Line /></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Admin>
        </>
    )
}

export default Category



// var width = 1920;
// var height = 1080;


// var canvas = document.createElement('canvas');  // Dynamically Create a Canvas Element
// var img = document.createElement('img');
// img.src = upload.imgsrc;
// var w, h;
// img.onload = function () {
//     w = img.width;
//     h = img.height;
// }
// canvas.width = 1024;  // Set the width of the Canvas
// canvas.height = 1024;  // Set the height of the Canvas
// var ctx = canvas.getContext("2d");  // Get the "context" of the canvas
// var img = document.getElementsByClassName('product-img')[index].getElementsByTagName('img')[0];  // The id of your image container
// ctx.drawImage(img, 0, 0, width, height);  // Draw your image to the canvas


// var jpegFile = canvas.toDataURL("image/webp");

