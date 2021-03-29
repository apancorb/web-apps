package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func newRouter() *mux.Router {
	// create a new instance of a router
	r := mux.NewRouter()
	r.HandleFunc("/hello", handler).Methods("GET")
	// declare the static file directory
	staticFileDirectory := http.Dir("./assets/")
	// declare the handler, that routes requests to their respective filename
	staticFileHandler := http.StripPrefix("/assets/", http.FileServer(staticFileDirectory))
	// The "PathPrefix" method acts as a matcher, and matches all routes starting
	// with "/assets/", instead of the absolute route itself
	r.PathPrefix("/assets/").Handler(staticFileHandler).Methods("GET")
	// new apis
	r.HandleFunc("/bird", getBirdHandler).Methods("GET")
	r.HandleFunc("/bird", createBirdHandler).Methods("POST")
	return r
}

func handler(w http.ResponseWriter, r *http.Request) {
	// print to the response writer the string
	fmt.Fprintf(w, "Hello World!")
}

func main() {
	// Declare a new router
	r := newRouter()
	// bind and listen the web server
	http.ListenAndServe("127.0.0.1:8002", r)
}
