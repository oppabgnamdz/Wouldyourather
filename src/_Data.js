export let users = {
    robo1: {
        id: 'robo1',
        name: 'Rô bốt đỏ',
        avatarURL: "https://robohash.org/1",
        answers: {

        },
        questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    },
    robo2: {
        id: 'robo2',
        name: 'Rô bốt vàng',
        avatarURL: "https://robohash.org/2",
        answers: {

        },
        questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
    robo3: {
        id: 'robo3',
        name: 'Rô bốt tím',
        avatarURL: "https://robohash.org/3",
        answers: {

        },
        questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
    }
}

let questions = {
    "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        author: 'robo1',
        timestamp: 1467166872634,
        options: {
            '8xf0y6ziyjabvozddd253ab': {
                votes: [],
                text: 'Ronaldo'
            },
            '8xf0y6ziyjabvozdd253cbc': {
                votes: [],
                text: 'Messi'
            }
        }
    },
    "6ni6ok3ym7mf1p33lnez": {
        id: '6ni6ok3ym7mf1p33lnez',
        author: 'robo2',
        timestamp: 1468479767190,
        options: {
            '8xf0y6ziyjabvodzdd253cd': {
                votes: [],
                text: 'Mac OS'
            },
            '8xf0y6ziyjabavozdd253de': {
                votes: [],
                text: 'Linux'
            },
            "8xf0y6ziyjabzvozdd253ef": {
                votes: [],
                text: 'Window'
            }
        }
    },
    "am8ehyc8byjqgar0jgpub9": {
        id: 'am8ehyc8byjqgar0jgpub9',
        author: 'robo1',
        timestamp: 1488579767190,
        options: {
            '8xf0y6ziyjabvo4zdvd253fg': {
                votes: [],
                text: 'Đông'
            },
            '8xf0y6ziyja2abvozdd253gh': {
                votes: [],
                text: 'Tây'
            },
            "8xf0y6ziyjabvoaz3dd253hi": {
                votes: [],
                text: 'Nam'
            },
            "8xf0y6ziyjabv1ozfdd253ij": {
                votes: [],
                text: 'Bắc'
            }

        }
    },
    "loxhs1bqm25b708cmbf3g": {
        id: 'loxhs1bqm25b708cmbf3g',
        author: 'robo2',
        timestamp: 1482579767190,
        options: {
            '8xf0y6ziyjaebvozdd253jk': {
                votes: [],
                text: 'Kim'
            },
            '8xf0y6ziyjabvozdfd253kl': {
                votes: [],
                text: 'Mộc'
            },
            "8xf0y6ziyjabvofzdd253lm": {
                votes: [],
                text: 'Thủy'
            },
            "8xf0y6sdziyjabvozdd253mn": {
                votes: [],
                text: 'Hỏa'
            },
            "8xf0y6ziyjabvoazdd253np": {
                votes: [],
                text: 'Thổ'
            }

        }

    },
    "vthrdm985a262al8qx3do": {
        id: 'vthrdm985a262al8qx3do',
        author: 'robo3',
        timestamp: 1489579767190,
        options: {
            '12f0y6ziyjabvvozdd253jk': {
                votes: [],
                text: 'Justatee'
            },
            '23f0y6ziyjaqbvozdd253kl': {
                votes: [],
                text: 'Rhymastic'
            },
            "34f0y6ziyjabevozdd253lm": {
                votes: [],
                text: 'Wowwy'
            },
            "45f0y6ziyjabvoezdd253mn": {
                votes: [],
                text: 'Karik'
            },
            "56f0y6ziyjabvwozdd253np": {
                votes: [],
                text: 'Suboizz'
            },
            "78f0y6ziyjabvoezdd253np": {
                votes: [],
                text: 'Binzz'
            }

        }
    },
    "xj352vofupe1dqz9emx13r": {
        id: 'xj352vofupe1dqz9emx13r',
        author: 'robo3',
        timestamp: 1493579767190,
        options: {
            '78f0y6ziyjabvozaa253np': {
                votes: [],
                text: 'Tam giác'
            },
            '78f0y6ziyjabvozbb253np': {
                votes: [],
                text: 'Hình Vuông'
            },
            '78f0y6ziyjabvozcc253np': {
                votes: [],
                text: 'Hình tròn'
            }
        }
    },
}

function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers() {
    return new Promise((res, rej) => {
        setTimeout(() => res({ ...users }), 1000)
    })
}

export function _getQuestions() {
    return new Promise((res, rej) => {
        setTimeout(() => res({ ...questions }), 1000)
    })
}

function formatQuestion({ options, author }) {
    return {
        id: generateUID(),
        timestamp: Date.now(),
        author,
        options: options
    }
}

export function _saveQuestion(question) {
    return new Promise((res, rej) => {
        const authedUser = question.author;
        const formattedQuestion = formatQuestion(question);
        setTimeout(() => {
            questions = {
                ...questions,
                [formattedQuestion.id]: formattedQuestion
            }

            users = {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    questions: users[authedUser].questions.concat([formattedQuestion.id])
                }
            }

            res(formattedQuestion)
        }, 1000)
    })
}

export function _saveQuestionAnswer({ authedUser, qid, answer }) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            users = {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    answers: {
                        ...users[authedUser].answers,
                        [qid]: answer
                    }
                }
            }

            answer.map(item => {
                questions = {
                    ...questions,
                    [qid]: {
                        ...questions[qid],
                        options: {
                            ...questions[qid].options,
                            [item]: {
                                ...questions[qid].options[item],
                                votes: questions[qid].options[item].votes.concat([authedUser])
                            }
                        }
                    }
                }
             
            })
        
            res()
        }, 0)
    })
}