import {model , Schema} from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLenght:[8, 'Title must be atleast 8 charater'],
        maxLenght: [ 30, 'Title must be less than 30 charater'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Title is required'],
        minLenght:[8, 'Title must be atleast 8 charater'],
        maxLenght: [ 200, 'Title must be less than 30 charater'],
        
    },
    category:{
        type: String,
        required: [true, 'Title is required'],
    },
        
     thumbnail:{
        public_id:{
            type: String

        },
        secure_url: {
            type: String

        }

      },
      lectures: [
        {
            title:String,
            description: String,
            lecture: {
                public_id:{
                    type: String

                },
                secure_url: {
                    type: String

                }
            }
        }
     ]
    ,
    numberOfLectures:{
        type: Number,
        default: 0
    },
    createdBy: {
        type: String
    }


    },{
        timestamps:true
    }
);

const Course = model('Course', courseSchema);

export default Course;