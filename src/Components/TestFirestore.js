import React, {useState, useRef, useEffect} from 'react'
import firebase from '../firebase'
import Button from '../Assets/Button'
import MyTextField from '../Assets/MyTextField'


export default function TestFirestore(){

const createRef = useRef()
const readRef = useRef()
const updateRef = useRef()
const deleteRef = useRef()


const [test, setTest] = useState('ceci est à enregistrer')
const [createText, setCreateText] = useState('')
const [readText, setReadText] = useState('')
const [updateText, setUpdateText] = useState('')
const [deleteText, setDeleteText] = useState('')


const onClickCreate = () => {
  //alert('Create!')

    var docData = {
        stringExample: "Hello world!",
        booleanExample: true,
        numberExample: 3.14159265,
        //dateExample: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
        arrayExample: [5, true, "hello"],
        nullExample: null,
        objectExample: {
            a: 5,
            b: {
                nested: "foo"
            }
        }
    };


    const db = firebase.firestore()
    db.collection('maTable').add({
      namae: 'coucou',
      slogan: 'c\'est nous'
    })
    .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });



}
const onChangeCreateField = (event) => {
  setCreateText(createRef.current.value)
}

const onClickRead = () => {
  //alert('Read!')
}
const onChangeReadField = (event) => {
  setReadText(readRef.current.value)
}

const onClickUpdate = () => {
  //alert('Update!')
  const db = firebase.firestore()
  db.collection('maTable').collection('23z4ONq6dTv2nEXqp3Fv').update({
    namae: updateText
  })
}
const onChangeUpdateField = (event) => {
  setUpdateText(updateRef.current.value)
}

const onClickDelete = () => {
  //alert('Delete!')
}
const onChangeDeleteField = (event) => {
  setDeleteText(deleteRef.current.value)
}

//Pour accéder à des documents
useEffect(()=>{
  const fetchData = async () => {
    const db = firebase.firestore()
    const data = await db.collection('maTable').doc('EMtE0Qo27dE1lHErQHvi').collection('maPremiereCollection').get()
    setReadText(data.docs.map(doc => doc.data()))
  }
 fetchData()

}, [])

console.log(readText)

  return (
<>
<div>
      <div style={{display: 'flex'}}>
      <Button text='Create' color='primary' onClick={onClickCreate}  />
      <MyTextField onChange={()=>{onChangeCreateField()}} value={createText} inputRef={createRef}/>
      </div>

      <div style={{display: 'flex'}}>
      <Button text='Read' color='primary' onClick={onClickRead}  />
      <MyTextField onChange={()=>{onChangeReadField()}} value={readText} inputRef={readRef}/>
      </div>

      <div style={{display: 'flex'}}>
      <Button text='Update' color='primary' onClick={onClickUpdate}  />
      <MyTextField onChange={()=>{onChangeUpdateField()}} value={updateText} inputRef={updateRef}/>
      </div>

      <div style={{display: 'flex'}}>
      <Button text='Delete' color='primary' onClick={onClickDelete}  />
      <MyTextField onChange={()=>{onChangeDeleteField()}} value={deleteText} inputRef={deleteRef}/>
      </div>


</div>



</>
  )

}
