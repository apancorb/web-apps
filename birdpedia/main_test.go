package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
)

// test for the '/' route
func TestHandler(t *testing.T) {
	// form a new HTTP request
	req, err := http.NewRequest("GET", "", nil)
	if err != nil {
		t.Fatal(err)
	}
	// create an http recorder, this will act as the target of our http request
	recorder := httptest.NewRecorder()
	// create an http handler from our handler function, handler is defined in "main.go"
	hf := http.HandlerFunc(handler)
	// server the http request to our recorder
	hf.ServeHTTP(recorder, req)
	// check the status code is what we expect
	if status := recorder.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v expected %v", status, http.StatusOK)
	}
	// check the body response is what we expected
	if actual, expected := recorder.Body.String(), "Hello World!"; actual != expected {
		t.Errorf("handler returned unexpected body: got %s expected %s", actual, expected)
	}
}

// test the routing
func TestRouter(t *testing.T) {
	// instantiate the router using the constructor in main
	r := newRouter()
	// create a mock server
	mockServer := httptest.NewServer(r)
	fmt.Println(mockServer)
	// make a GET request to the "hello" route we defined in the router
	resp, err := http.Get(mockServer.URL + "/hello")
	if err != nil {
		t.Fatal(err)
	}
	// check for 200 status code
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Status should be ok, got %d", resp.StatusCode)
	}
	// In the next few lines, the response body is read, and converted to a string
	defer resp.Body.Close()
	// read the body into a bunch of bytes (b)
	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatal(err)
	}
	// convert the bytes to a string
	respString := string(b)
	expected := "Hello World!"

	// We want our response to match the one defined in our handler.
	// If it does happen to be "Hello world!", then it confirms, that the
	// route is correct
	if respString != expected {
		t.Errorf("Response should be %s, got %s", expected, respString)
	}
}

func TestRouterForNonExistentRoute(t *testing.T) {
	r := newRouter()
	mockServer := httptest.NewServer(r)
	// Most of the code is similar. The only difference is that now we make a
	//request to a route we know we didn't define, like the `POST /hello` route.
	resp, err := http.Post(mockServer.URL+"/hello", "", nil)

	if err != nil {
		t.Fatal(err)
	}

	// We want our status to be 405 (method not allowed)
	if resp.StatusCode != http.StatusMethodNotAllowed {
		t.Errorf("Status should be 405, got %d", resp.StatusCode)
	}

	// The code to test the body is also mostly the same, except this time, we
	// expect an empty body
	defer resp.Body.Close()
	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatal(err)
	}
	respString := string(b)
	expected := ""

	if respString != expected {
		t.Errorf("Response should be %s, got %s", expected, respString)
	}

}

func TestStaticFileServer(t *testing.T) {
	r := newRouter()
	mockServer := httptest.NewServer(r)

	// We want to hit the `GET /assets/` route to get the index.html file response
	resp, err := http.Get(mockServer.URL + "/assets/")
	if err != nil {
		t.Fatal(err)
	}

	// We want our status to be 200 (ok)
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Status should be 200, got %d", resp.StatusCode)
	}

	// It isn't wise to test the entire content of the HTML file.
	// Instead, we test that the content-type header is "text/html; charset=utf-8"
	// so that we know that an html file has been served
	contentType := resp.Header.Get("Content-Type")
	expectedContentType := "text/html; charset=utf-8"

	if expectedContentType != contentType {
		t.Errorf("Wrong content type, expected %s, got %s", expectedContentType, contentType)
	}

}
