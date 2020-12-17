import React, {useState, useEffect} from 'react'
import {Card, Button, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import firebase from 'firebase'
import PieChart from '../Assets/PieChart'
import {listSourate,
  listSourateCompleted,
  calculSansFaute,
  sourateSucceed,
  sourateFailed,
  percentageSucceed
} from '../Functions/myFunction'


export default function Dashboard(){

const [error, setError] =useState('')
const {currentUser, logout} = useAuth()
const [dataServ,setDataServ] = useState([])
const history = useHistory()

async function handleLogout(){
setError('')

try {

await logout()
history.push('/login')

} catch {
  setError('Failed to logout')
}

}

function handleBack(){
  history.goBack()
}


useEffect(()=>{
  const fetchData = async () => {
    const db = firebase.firestore()
    const data = await db.collection('Users').doc(currentUser.email).get()
    .then(function(doc){
      if (doc.exists){
            //console.log(doc.data())
            setDataServ(doc.data())
            //console.log(dataServ)
          }
    })
{/*    .then(()=>{
      console.log(dataServ.sourates)
      console.log(calculSansFaute(dataServ.sourates))
      setSansFaute(calculSansFaute(dataServ.sourates))
    }
  )*/}

  }
 fetchData()

}, [])


if (Array.isArray(dataServ.sourates)) {
  //console.log('données sont chargées')
  //console.log(dataServ.sourates)
  var perfectRate = calculSansFaute(dataServ.sourates)
  var numberParties = dataServ.sourates.length
  var sourateCommence = listSourate(dataServ.sourates).length
  var sourateOK = sourateSucceed(dataServ.sourates)
  var sourateNOK = sourateFailed(dataServ.sourates)
  var percentageOK = percentageSucceed(dataServ.sourates)
} else {
  var perfectRate = 0
  var numberParties = 0
  var sourateCommence = 0
  var sourateOK= 0
  var sourateNOK = 0
  var percentageOK = 0
}


  return (
<>

    <Card>
        <Card.Body>
        <h2 className="text-center mb-4">Statistiques</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {/*        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>*/}
        <p><strong>Nombre de sourates réussies:</strong> {sourateOK}</p>
        <p><strong>Nombre de sourates non réussies:</strong>{sourateNOK}</p>
        <p><strong>Nombre de sourates non commencées:</strong> {114-sourateOK-sourateNOK} </p>
        <p><strong>Nombre de parties:</strong> {numberParties}  </p>
        <p><strong>Pourcentage de bonnes réponses:</strong> {percentageOK.rateSucceed}% - ({percentageOK.sommeScore}/{percentageOK.sommeScore+percentageOK.sommeErreur})</p>
        <p><strong>Pourcentage de "sans faute": </strong>{perfectRate + ' %'}</p>


        </Card.Body>
    </Card>

    <div className="w-100 text-center mt-2">
    <Button variant="link" onClick={handleLogout}>Log Out</Button>
    <Button variant="link" onClick={handleBack}>Back</Button>
    </div>

</>

  )
}
