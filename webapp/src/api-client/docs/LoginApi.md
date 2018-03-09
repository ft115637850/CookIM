# CookIM.LoginApi

All URIs are relative to *http://127.0.0.1:8080/api/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**login**](LoginApi.md#login) | **GET** /login | login server


<a name="login"></a>
# **login**
> LoginResult login()

login server

### Example
```javascript
import CookIM from 'CookIM';
let defaultClient = CookIM.ApiClient.instance;

// Configure HTTP basic authorization: basic
let basic = defaultClient.authentications['basic'];
basic.username = 'YOUR USERNAME';
basic.password = 'YOUR PASSWORD';

// Configure OAuth2 access token for authorization: oauth
let oauth = defaultClient.authentications['oauth'];
oauth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new CookIM.LoginApi();
apiInstance.login().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters
This endpoint does not need any parameter.

### Return type

[**LoginResult**](LoginResult.md)

### Authorization

[basic](../README.md#basic), [oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

