# CookIM.ListSessionsApi

All URIs are relative to *http://127.0.0.1:8080/api/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listSessions**](ListSessionsApi.md#listSessions) | **GET** /{isPublicOrPrivate}/listSessions | get content


<a name="listSessions"></a>
# **listSessions**
> SessionList listSessions(isPublicOrPrivate)

get content

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

let apiInstance = new CookIM.ListSessionsApi();

let isPublicOrPrivate = "isPublicOrPrivate_example"; // String | the indicator of whether it is public or private

apiInstance.listSessions(isPublicOrPrivate).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **isPublicOrPrivate** | **String**| the indicator of whether it is public or private | 

### Return type

[**SessionList**](SessionList.md)

### Authorization

[basic](../README.md#basic), [oauth](../README.md#oauth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

