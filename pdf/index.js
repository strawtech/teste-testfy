import pdf from 'html-pdf';
import fs from 'fs';
import path from 'path';

const pdf_functions = {
	create : (template, user) => {
		pdf.create(template, {format: 'A4'}).toFile(`${__dirname}/files/${user}.pdf`, (err, res) => {
			if (err) {
				return ({error : true});
			}
		});
	},

	template : ({user, date, phone}) => {
		return (
			`<!doctype html>
				<html>
				<head>
					<meta charset="utf-8">
					<title>PDF</title>
				</head>
				<body>
					<div>
						<p>Usuário: ${user}</p>
						<p>Telefone: ${phone}</p>
						<p>Data de Nascimento: ${date}</p>
					</div>
				</body>
			</html>`
		);
	},

	checkFile : (filePath) => {
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				watcher.close();
				reject({status : 0, error: 'Timeout'});
			}, 30000);

			const dir = path.dirname(filePath);
			const base = path.basename(filePath);
			const watcher = fs.watch(dir, (event, filename) => {
				if (filename === base) {
					setTimeout (() => {
						clearTimeout(timeout);
						watcher.close();
						resolve({status : 1});
					}, 500);		
				}
			});
		})
	}
}

export default pdf_functions;