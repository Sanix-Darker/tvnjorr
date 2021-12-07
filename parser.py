from m3u_parser import M3uParser
import json
import sys


def parser_channels():
    chns = ['fra'] # you can add 'eng' for english channels
    chans = []
    for c in chns:
        useragent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36"
        parser = M3uParser(timeout=50, useragent=useragent)
        parser.parse_m3u(f"https://iptv-org.github.io/iptv/languages/{c}.m3u")
        parser.filter_by('status', 'GOOD')
        parserred_list = parser.get_list()
        
        print(len(parserred_list))
        # We remove unecessary stuffs
        for j in parserred_list:
            del j["category"]
            del j["tvg"]
            del j["country"]
            del j["logo"]
            del j["language"]
            del j["status"]

        # We append to the output
        chans += parserred_list

    open("./channels/bin.json", "w+", 1).write(json.dumps(chans, separators=(',', ":")))


if __name__ == "__main__":
    parser_channels()
