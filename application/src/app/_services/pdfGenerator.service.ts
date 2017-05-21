import { Injectable } from '@angular/core';

import { DocumentService } from '../_services/document.service';
import { Document } from '../_models/document.model';
import { DocumentPositionService } from '../_services/documentPosition.service';
import { DocumentPosition } from '../_models/documentPosition.model';
import { UserDataService } from '../_services/userData.service';
import { UserData } from '../_models/userData.model';
import { ConsumerService } from '../_services/consumer.service';
import { Consumer } from '../_models/consumer.model';

declare let pdfMake: any;

@Injectable()
export class pdfGeneratorService {

    document: Document[] = [];
    documentPositions: DocumentPosition[] = [];
    userData: UserData[] = [];
    consumer: Consumer[] = [];
    docDef: any;
    private sub: any;

    constructor(
        private documentService: DocumentService,
        private documentPositionService: DocumentPositionService,
        private userDataService: UserDataService,
        private consumerService: ConsumerService
    ) {}

    getPDF(id, method) {
        this.documentService.getDocument(id)
            .subscribe(document => {
                this.document = document;

                this.userDataService.get()
                    .subscribe(userData => {
                        this.userData = userData;

                        this.sub = this.consumerService.getConsumer(this.document['consumerId'])
                            .subscribe(consumer => {
                                this.consumer = consumer;

                                this.documentPositionService.getDocumentPositions(id)
                                    .subscribe(positions => {
                                            this.documentPositions = positions;
                                            this.generateDocument(id, method);
                                        },
                                        (err) => {
                                            this.generateDocument(id, method);
                                        });
                            });
                    });
            });
    }

    generateDocument(id, method) {
        this.docDef = {
            content: [{
                columns: [{
                    width: '*',
                    stack: [
                        { text: '', style: 'companyName' },
                        { text: '' },
                        { text: '' }
                    ],
                    style: 'company'
                }, {
                    width: '*',
                    text: '',
                    style: 'type'
                }, ],
            }, {
                columns: [{
                    width: '*',
                    stack: [
                        { text: 'Sprzedawca', style: 'dataHeader' },
                        { text: '' },
                        { text: '' },
                        { text: '' },
                        { text: '' }
                    ],
                    style: 'data'
                }, {
                    width: '*',
                    stack: [
                        { text: 'Nabywca', style: 'dataHeader' },
                        { text: '' },
                        { text: '' },
                        { text: '' },
                        { text: '' }
                    ],
                    style: 'data'
                }, {
                    width: 'auto',
                    stack: [
                        { text: 'Numer #' },
                        { text: 'Data' },
                        { text: 'Data płatności' },
                        { text: 'Metoda płatności' },
                        { text: 'Zapłacono' },
                        { text: 'Miejsce' }
                    ],
                    style: 'dataRight'
                }, {
                    width: 'auto',
                    stack: [
                        { text: '' },
                        { text: '' },
                        { text: '' },
                        { text: '' },
                        { text: '' },
                        { text: '' }
                    ],
                    style: 'dataRightMargin'
                }, ],
            }, {
                table: {
                    headerRows: 1,
                    widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto'],

                    body: [
                        ['L.p.', 'Nazwa', 'Ilość', 'Netto', 'VAT', 'Kwota VAT', 'Brutto']
                    ]
                },
                style: 'table'
            }, {
                stack: [{
                    text: [
                        { text: 'Do zapłaty: ' },
                        { text: '300 zł', bold: true },
                    ]
                }, {
                    text: [
                        { text: 'Słownie: ' },
                        { text: 'trzysta złotych', bold: true },
                    ]
                }],
                margin: [0, 50, 0, 0]
            }],
            footer: {
                text: 'Dokument wygenerowany przy pomocy webaplikacji warsztat | DSP2017',
                margin: [40, 0, 0, 0],
                fontSize: 8
            },
            styles: {
                company: {
                    fontSize: 10,
                    margin: [0, 0, 0, 40]
                },
                companyName: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                type: {
                    fontSize: 15,
                    bold: true,
                    alignment: 'right',
                    margin: [0, 0, 0, 40]
                },
                data: {
                    fontSize: 11
                },
                dataRight: {
                    alignment: 'right',
                    bold: true,
                    fontSize: 11
                },
                dataRightMargin: {
                    alignment: 'right',
                    fontSize: 11,
                    margin: [15, 0, 0, 0]
                },
                dataHeader: {
                    fontSize: 12,
                    bold: true,
                    margin: [0, 0, 0, 6]
                },
                table: {
                    margin: [0, 20, 0, 0]
                }
            }
        };

        this.docDef['content'][0]['columns'][0]['stack'][0]['text'] = this.userData['company'];
        this.docDef['content'][0]['columns'][0]['stack'][1]['text'] = 'ul. ' + this.userData['street'] + ' ' + this.number(this.userData['buildNumber'], this.userData['apartmentNumber']);
        this.docDef['content'][0]['columns'][0]['stack'][2]['text'] = this.userData['postalCode'] + ' ' + this.userData['place'];

        let type = (this.document['type'] == 'Rachunek') ? "Rachunek" : "Faktura VAT"
        this.docDef['content'][0]['columns'][1]['text'] = type;

        this.docDef['content'][1]['columns'][0]['stack'][1]['text'] = this.userData['firstName'] + ' ' + this.userData['lastName'];
        this.docDef['content'][1]['columns'][0]['stack'][2]['text'] = 'ul. ' + this.userData['street'] + ' ' + this.number(this.userData['buildNumber'], this.userData['apartmentNumber']);
        this.docDef['content'][1]['columns'][0]['stack'][3]['text'] = this.userData['postalCode'] + ' ' + this.userData['place'];
        this.docDef['content'][1]['columns'][0]['stack'][4]['text'] = 'NIP ' + this.userData['nip'];

        this.docDef['content'][1]['columns'][1]['stack'][1]['text'] = this.consumer['name'];
        this.docDef['content'][1]['columns'][1]['stack'][2]['text'] = 'ul. ' + this.consumer['street'] + ' ' + this.number(this.consumer['buildNumber'], this.consumer['apartmentNumber']);
        this.docDef['content'][1]['columns'][1]['stack'][3]['text'] = this.consumer['postalCode'] + ' ' + this.consumer['place'];
        this.docDef['content'][1]['columns'][1]['stack'][4]['text'] = 'NIP ' + this.isset(this.consumer['nip']);

        let paid = this.consumer['paid'] ? "TAK" : "NIE";
        this.docDef['content'][1]['columns'][3]['stack'][0]['text'] = this.document['number'];
        this.docDef['content'][1]['columns'][3]['stack'][1]['text'] = this.dateFormat(this.document['date']);
        this.docDef['content'][1]['columns'][3]['stack'][2]['text'] = this.dateFormat(this.document['dateOfPayment']);
        this.docDef['content'][1]['columns'][3]['stack'][3]['text'] = this.document['paymentMethod'];
        this.docDef['content'][1]['columns'][3]['stack'][4]['text'] = paid;
        this.docDef['content'][1]['columns'][3]['stack'][5]['text'] = this.consumer['place'];

        let nettoSum = 0;
        let vatSumSum = 0;
        let bruttoSum = 0;
        let iterations = this.documentPositions.length;
        for (let i = 1; i <= iterations; i++) {
            this.docDef['content'][2]['table']['body'].push(
                [
                    i,
                    this.documentPositions[i - 1]['name'],
                    this.documentPositions[i - 1]['quantity'],
                    this.amount(this.documentPositions[i - 1]['netto']),
                    this.amount(this.documentPositions[i - 1]['vat']) + '%',
                    this.amount(this.documentPositions[i - 1]['vatSum']),
                    this.amount(this.documentPositions[i - 1]['brutto'])
                ]
            );
            nettoSum = nettoSum + this.documentPositions[i - 1]['netto'];
            vatSumSum = vatSumSum + this.documentPositions[i - 1]['vatSum'];
            bruttoSum = bruttoSum + this.documentPositions[i - 1]['brutto'];
        }

        this.docDef['content'][2]['table']['body'].push([{ colSpan: 3, text: 'Razem', alignment: 'right', border: [0, 0, 0, 0] }, '', '', { text: this.amount(nettoSum), bold: true }, '', { text: this.amount(vatSumSum), bold: true }, { text: this.amount(bruttoSum), bold: true }]);

        this.docDef['content'][3]['stack'][0]['text'][1]['text'] = bruttoSum+' zł';
        this.docDef['content'][3]['stack'][1]['text'][1]['text'] = this.slowa(bruttoSum);

        let pdf = pdfMake.createPdf(this.docDef);
        switch(method) {
            case 'print':
                pdf.print();
            break;
            case 'download':
                pdf.download();
            break;
            case 'preview':
                pdf.open();
            break;
        }
    }

    dateFormat(dateString) {
        let date = new Date(dateString);
        let day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
        let month = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);

        return day + '/' + month + '/' + date.getFullYear();
    }

    number(build, apartment) {
        let number = '';
        if (typeof build != 'undefined') {
            number = build;
            if (typeof apartment != 'undefined') {
                number = build + '/' + apartment;
            }
        }
        return number;
    }

    amount(price) {
        return price.toLocaleString(
            'pl-PL', // use a string like 'en-US' to override browser locale
            { minimumFractionDigits: 2 }
        );
    }

    isset(data) {
        let set = "";
        if (typeof data != 'undefined')
            set = data

        return set;
    }

    slowa(value) {
        let liczba = value;

        let jednosci = ["", " jeden", " dwa", " trzy", " cztery", " pięć", " sześć", " siedem", " osiem", " dziewięć"];
        let nascie = ["", " jedenaście", " dwanaście", " trzynaście", " czternaście", " piętnaście", " szesnaście", " siedemnaście", " osiemnaście", " dziewietnaście"];
        let dziesiatki = ["", " dziesięć", " dwadzieścia", " trzydzieści", " czterdzieści", " pięćdziesiąt", " sześćdziesiąt", " siedemdziesiąt", " osiemdziesiąt", " dziewięćdziesiąt"];
        let setki = ["", " sto", " dwieście", " trzysta", " czterysta", " pięćset", " sześćset", " siedemset", " osiemset", " dziewięćset"];
        let grupy = [
            ["", "", ""],
            [" tysiąc", " tysiące", " tysięcy"],
            [" milion", " miliony", " milionów"],
            [" miliard", " miliardy", " miliardów"],
            [" bilion", " biliony", " bilionów"],
            [" biliard", " biliardy", " biliardów"],
            [" trylion", " tryliony", " trylionów"]
        ];

        if (!isNaN(liczba)) {

            let wynik = '';
            let znak = '';
            if (liczba == 0)
                wynik = "zero";
            if (liczba < 0) {
                znak = "minus";
                liczba = liczba;
            }

            let g = 0;
            while (liczba > 0) {
                let s = Math.floor((liczba % 1000) / 100);
                let n = 0;
                let d = Math.floor((liczba % 100) / 10);
                let j = Math.floor(liczba % 10);
                if (d == 1 && j > 0) {
                    n = j;
                    d = 0;
                    j = 0;
                }

                let k = 2;
                if (j == 1 && s + d + n == 0)
                    k = 0;
                if (j == 2 || j == 3 || j == 4)
                    k = 1;
                if (s + d + n + j > 0)
                    wynik = setki[s] + dziesiatki[d] + nascie[n] + jednosci[j] + grupy[g][k] + wynik;

                g++;
                liczba = Math.floor(liczba / 1000);
            }
            return znak + wynik;
        }
    }

}
