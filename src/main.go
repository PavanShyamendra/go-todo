package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type Job struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

var jobs []Job

func getJobs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Printf("GetJobs func\n")
	json.NewEncoder(w).Encode(jobs)
}

func deleteJob(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("in the Delete Func")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)

	for index, item := range jobs {
		if item.ID == params["id"] {
			jobs = append(jobs[:index], jobs[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(jobs)
}

func getJob(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	for _, item := range jobs {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			break
		}
	}
}

func createJob(w http.ResponseWriter, r *http.Request) {
	fmt.Print("CreateJob Func\n")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	var job Job
	_ = json.NewDecoder(r.Body).Decode(&job)
	job.ID = strconv.Itoa(rand.Intn(100000))
	jobs = append(jobs, job)
	json.NewEncoder(w).Encode(job)
}

func updateJob(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)

	for index, item := range jobs {
		if item.ID == params["id"] {
			jobs = append(jobs[:index], jobs[index+1:]...)
			var job Job
			_ = json.NewDecoder(r.Body).Decode(&job)
			job.ID = item.ID
			jobs = append(jobs, job)
			json.NewEncoder(w).Encode(job)
			break
		}
	}
}

func main() {
	r := mux.NewRouter()

	jobs = append(jobs, Job{ID: "1", Name: "Eat"})
	jobs = append(jobs, Job{ID: "2", Name: "Code"})

	handlers.AllowedOrigins([]string{"*"})

	r.HandleFunc("/jobs", getJobs).Methods("GET")
	r.HandleFunc("/jobs/{id}", getJob).Methods("GET")
	r.HandleFunc("/jobs", createJob).Methods("POST")
	r.HandleFunc("/jobs/{id}", updateJob).Methods("PUT")
	r.HandleFunc("/jobs/{id}", deleteJob).Methods("DELETE")

	fmt.Printf("Starting server at 8080")
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))(r)))
}
