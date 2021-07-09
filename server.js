require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Note = require('./models/note');

let notes = [
	{
		id: 1,
		content: 'HTML is easy',
		date: '2019-05-30T17:30:31.098Z',
		important: true,
	},
	{
		id: 2,
		content: 'Browser can execute only Javascript',
		date: '2019-05-30T18:39:34.091Z',
		important: false,
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		date: '2019-05-30T19:20:14.298Z',
		important: true,
	},
];

const unknownEndpoint = (request, response) => {
	response.status(404).send({
		error: 'unknown endpoint',
	});
};

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).send({ error: error.message });
	}
	next(error);
};

// Middlewares

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token('postData', (request, response) => {
	return JSON.stringify(request.body);
});

app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :postData'
	)
);

const generateId = () => {
	const maxId =
		notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
	return maxId + 1;
};

app.get('/', (request, response) => {
	response.send('<h1>📒 Basic notes rest-api.</h1>');
});

app.get('/api/notes', (request, response) => {
	// response.json(notes);
	Note.find({}).then((notes) => {
		response.json(notes);
	});
});

app.get('/api/notes/:id', (request, response, next) => {
	const id = request.params.id;
	// const note = notes.find((note) => note.id === id);
	Note.findById(id)
		.then((note) => {
			if (note) {
				return response.json(note);
			}
			response.status(404).end();
		})
		.catch((error) => {
			next(error);
		});
	// if (note) {
	// 	response.json(note);
	// } else {
	// 	response.status(404).end();
	// }
});

app.post('/api/notes', (request, response, next) => {
	const body = request.body;

	// if (!body.content) {
	// 	return response.status(400).json({
	// 		error: 'Content missing',
	// 	});
	// }

	// const note = {
	// 	id: generateId(),
	// 	content: body.content,
	// 	important: body.important || false,
	// 	date: new Date(),
	// };

	const note = new Note({
		content: body.content,
		important: body.important || false,
		date: new Date(),
	});

	note
		.save()
		.then((savedNote) => savedNote.toJSON())
		.then((savedAndFormattedNote) => response.json(savedAndFormattedNote))
		.catch((error) => next(error));

	// notes = notes.concat(note);
	// response.json(note);
});

app.put('/api/notes/:id', (request, response, next) => {
	const id = request.params.id;
	const body = request.body;

	const note = {
		content: body.content,
		important: body.important,
	};

	Note.findByIdAndUpdate(id, note, { new: true })
		.then((updatedNote) => {
			response.json(updatedNote);
		})
		.catch((error) => next(error));

	// const updateNoteIndex = notes.findIndex((note) => note.id === id);
	// const updateNoteObj = notes[updateNoteIndex];
	// notes[updateNoteIndex] = {
	// 	...updateNoteObj,
	// 	important: !updateNoteObj.important,
	// };
	// const updatedNoteObj = notes[updateNoteIndex];
	// response.json(updatedNoteObj);
});

app.delete('/api/notes/:id', (request, response, next) => {
	const id = request.params.id;
	Note.findByIdAndRemove(id)
		.then((result) => {
			console.log(result);
			if (result) {
				return response.status(204).end();
			}
			response.status(404).end();
		})
		.catch((error) => next(error));
	// notes = notes.filter((note) => note.id !== id);
	// response.status(204).end();
});

const PORT = process.env.PORT || 3002;

/* Do not move !
unknown endoint handler
*/
app.use(unknownEndpoint);

/* Do not move !
error handler
*/
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
