import { gql } from "apollo-angular";


const GET_PRODUCTS = gql`
query{
    products(pageInput:{page:0,size:3}){
        data{
            id
            name
            description
            price
        }
        page{
            totalElements
            size
            page
            totalPages
            hasNext
            hasPrev
        }
    }
}
`;

const AUTH_LOGIN = gql`
mutation user($input:LoginRequest!){
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



export {GET_PRODUCTS,AUTH_LOGIN,GET_USER_PROFILE,CHANGE_USER_PASSWORD,UPDATE_USER_PROFILE,SEND_FORGOT_PASSWORD_EMAIL}