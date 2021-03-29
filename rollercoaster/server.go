package main

import (
	"net/http"
)
https://www.youtube.com/watch?v=2v11Ym6Ct9Q&ab_channel=kubucation
type Coaster struct {
	Name         string `json:"name"`
	Manufacturer string `json:"manufacturer"`
	ID           string `json:"id"`
	InPark       string `json:"inPark"`
	Height       int    `json:"height"`
}

type coasterHandlers struct {
	store map[string]Coaster
}

func (h *coasterHandlers) coastersHandler(w http.ResponseWriter, r *http.Request) {

}

func newCoasterHandlers() *

func main() {
	http.HandleFunc("/coasters", coastersHandler)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
}
