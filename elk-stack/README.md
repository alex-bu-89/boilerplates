# General

This Repository provides an ELK-Stack (Logstash, ElasticSearch, Kibana) running on Docker. You can use it for your local development (logging, Kibana Dashboard).

## How to run

```
docker-compose -f ./docker-compose.yml up
```

Please make sure to increase the `vm_map_max_count`, see:
https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html#docker-cli-run-prod-mode

For Mac User: docker icon > preferences > advanced and slide the memory to be above 2GB.

## ElasticSearch

Port: 9200

http://localhost:9200/_search?pretty

## Kibana

Port: 5601

http://localhost:5601
