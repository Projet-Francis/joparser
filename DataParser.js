// const axios = require('axios');
// const { parse } = require('node-html-parser');
// const fs = require('fs');
import axios from 'axios';

// import fs from 'fs'
import { parse } from 'node-html-parser'

export class DataParser {
    
    _url  = 'https://olympics.com/en/paris-2024/medals';
    async  fetchAndParse() {
        try {
            // Faire une requête HTTP GET pour récupérer la page HTML
            const response = await axios.get(this._url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'Connection': 'keep-alive',
                }
            });
            const html = response.data;

            const root = parse(html);

            const contries = root.querySelectorAll(".elhe7kv0");
            let rows = [['Country','Gold','Silver','Bronze','tot']]
            for( let contry of contries){
                rows.push(this.parseCountry(contry))
            }
            const csvData = this.convertToCSV(rows);
            //fs.writeFileSync('output.csv', csvData);
            return csvData
        } catch (error) {
            console.error('Error fetching the page:', error);
        }
    }


    parseCountry(data){
        let name = data.querySelector(".elhe7kv5 ").childNodes[0]._rawText
        const scores = data.querySelectorAll(".e1oix8v91").map(el => el.childNodes[0]).filter(el => el).map(el => parseInt(el._rawText))
        return [name,...scores]
    }

    convertToCSV(data) {
        const rows = data.map(row => row.join(','));
        return rows.join('\n');
    }

}