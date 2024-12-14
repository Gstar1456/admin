const mongoose = require('mongoose');


const productSchema=new mongoose.Schema({
       'Date ordered':String,
        Retailer:String,
        'Amazon Order id':String,
        'Vendor ID':String,
        'Description':String,
        'SKUs to match':String,
        'Vendor Tracking #':String,
        ASINs:String,
        'Qty':String,
        "Qty Rec'd":String,
        'Date Received':String,
        'Qty Shipped':String,
        Shoes:String,
        'Date Shipped':String,
        Notes:String,
        'Replacement Shoe Box':String,
        'Vendor Return':String,
        'Return date':String,
        entryby:String,
        uploadedby:String,
        pdf:{
                default:'',
                type:String
        }
},{timestamps:true});

module.exports=mongoose.model('Product', productSchema)