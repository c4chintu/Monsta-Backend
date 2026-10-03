let mongoose=require("mongoose")

let materialSchema=mongoose.Schema(
    {
        status:{
            type:Boolean,
            default:true
        },
        name:{
            type:String,
            minLength:[2,"materail miniman length is 2"],
            maxLength:[15,"materail maximam length is 15"],
            required:[true,"materail name is require"]
        },
        order:{
            type:Number,
            default:0,
        },
        data:{
            type:Date,
            default:Date.now

        }
    }
)

let MaterialModel=mongoose.model("material",materialSchema)
module.exports=MaterialModel