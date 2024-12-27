const axios = require('axios');

module.exports.config = {
  name: 'fairy',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['FAIRY', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "gpt4 [prompt]",
  credits: 'Developer',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');

  if (!input) {
    api.sendMessage(
      "[ FAIRY-V2 ]\n\nPlease provide a query after 'gpt4'. Example: 'gpt4 What is AI?'",
      event.threadID,
      event.messageID
    );
    return;
  }

  api.sendMessage(
    "[ FAIRY-V2 ]\n\nPlease Answering...",
    event.threadID,
    (err, info) => {
      if (err) return;

      axios
        .get(`https://nash-api.onrender.com/api/gpt4?query=${encodeURIComponent(input)}`)
        .then(({ data }) => {
          const response = data.response;

          api.editMessage(
            response,
            info.messageID
          );
        })
        .catch(() => {
          api.editMessage(
            "[ FAIRY-V2 ]\n\nAn error occurred while processing your request.",
            info.messageID
          );
        });
    }
  );
};
