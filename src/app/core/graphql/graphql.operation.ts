import { gql } from "apollo-angular";

const GET_PRODUCT_BY_ID = gql`
query product($id:ID){
    product(id:$id){
      id
      name
      price
      availableQuantity
    }
}
`
const GET_PRODUCTS = gql`
query products($first:Int,$after:String,$last:Int,$before:String){
    products(first:$first,after:$after,last:$last,before:$before){
        edges{
            node{
                id
                name
                price
                availableQuantity
            }
        }
        pageInfo{
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
        }
    }
}
`;

const AUTH_LOGIN = gql`
mutation user($input:LoginInput!){
    loginUser(input:$input){
        refreshToken
        accessToken
        username
    }
}
`

const GET_USER_PROFILE = gql`
query user($username:String!){
    user(username:$username){
        username
        userProfile{
            email
            fullName
            phoneNumber
            zipcode
            addressLine1
            addressLine2
            city
        }
    }
}
`

const CHANGE_USER_PASSWORD = gql`
mutation changePassword($username:String!,$password:String!){
    changePassword(username:$username,password:$password)
}
`

const UPDATE_USER_PROFILE = gql`
mutation updateProfile($username:String!,$userInput:UserProfileInput!){
    updateProfile(username:$username,userProfile:$userInput){
        fullName
        email
        addressLine2
        addressLine1
        city
        zipcode
    }
}
`

const SEND_FORGOT_PASSWORD_EMAIL = gql`
mutation sendForgotPasswordEmail($emailAddress:String!){
    sendForgotPasswordEmail(emailAddress:$emailAddress)
}`

const CREATE_TRANSACTION = gql`
mutation createTransaction($paymentId:String!,$amount:BigDecimal!){
    createTransaction(paymentId:$paymentId,amount:$amount)
}
`

const CREATE_ORDER = gql`
mutation createOrder($orderInput:OrderInput!){
    createOrder(orderInput:$orderInput){
        id
        subtotal
        tax
    }
}
`

const CREATE_PAYMENT_AND_ORDER = gql`
mutation savePaymentAndOrder($paymentInput:PaymentInput!,$orderInput:OrderInput!){
    createPayment(paymentInput:$paymentInput){
        transactionId
        paymentMethod
        paymentStatus
    }
    createOrder(orderInput:$orderInput){
        id
        subtotal
        tax
    }
}
`

const UPLOAD_FILE = gql`
mutation uploadFile($files:[Upload]){
  uploadFile(file:$files)
}
`

const SAVE_APPOINTMENT = gql`
mutation saveAppointment($appointment:AppointmentInput){
  saveAppointment(appointment:$appointment){
    patientId
    doctorId
    timestamp
  }
}
`

const GET_APPOINTMENT = gql`
query appointments($first:Int,$after:String,$patientId:String){
    appointments(first:$first,after:$after,patientId:$patientId){
      edges{
        node{
            id
            timestamp
            doctorId
        }
      }
      pageInfo{
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
}`


const COUNT_APPOINTMENT = gql`
  query count($patientId:String){
    count(patientId:$patientId){
      month
      count
    }

  }`



export {GET_PRODUCT_BY_ID,GET_PRODUCTS,AUTH_LOGIN,GET_USER_PROFILE,CHANGE_USER_PASSWORD,UPDATE_USER_PROFILE,SEND_FORGOT_PASSWORD_EMAIL,CREATE_TRANSACTION,
CREATE_ORDER,CREATE_PAYMENT_AND_ORDER,UPLOAD_FILE,SAVE_APPOINTMENT,GET_APPOINTMENT,COUNT_APPOINTMENT}
