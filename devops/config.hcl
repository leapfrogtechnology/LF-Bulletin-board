syslog {
  enabled = false
  facility = "LOCAL5"
}

upcase = true
vault {
    address = "http://registry.lftechnology.com:5601"
    # grace = "15s"
    renew_token = false
    # unwrap_token = true
    # token   = VAULT_TOKEN # May also be specified via the envvar VAULT_TOKEN
    
}

secret {
  no_prefix = true
  path   = "secret/Inhouse/bulletin/dev/api"
  # format = "{ key }}"
}

wait {
  min = "5s"
  max = "10s"
}