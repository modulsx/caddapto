package handler

import (
	"encoding/json"
	"net/http"

	"github.com/caddyserver/caddy/v2/caddyconfig"
	_ "github.com/caddyserver/caddy/v2/caddyconfig/httpcaddyfile"
	_ "github.com/caddyserver/caddy/v2/modules/standard"
)

type RequestData struct {
	Input string
}

func Handler(w http.ResponseWriter, r *http.Request) {
	var adapterName = "caddyfile"
	var cfgAdapter caddyconfig.Adapter

	var requestData RequestData
	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// fmt.Println(requestData.Input)
	cfgAdapter = caddyconfig.GetAdapter(adapterName)
	if cfgAdapter != nil {
		config := []byte(requestData.Input)
		// config, err := ioutil.ReadFile("Caddyfile")
		adaptedConfig, _, err := cfgAdapter.Adapt(config, map[string]interface{}{
			"filename": "Caddyfile",
		})
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(`{"error": "Error While Adapting Config"}`))
			return
		} else {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			w.Write(adaptedConfig)
			return
		}
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error": "Config Adapter Error"}`))
		return
	}
}
