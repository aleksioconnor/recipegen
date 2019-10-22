const questionAnswerPairs =
[
	{
		category: "type",
		questions: [
			{
	      question_id: 1,
	      question_text: "Give me something...",
	      answer_options: [
	          { answer_text: "sweet",
	            answer_id: 1,
	            answer_tag_category: "type",
	            answer_tag: "sweet"
	          },
	          { answer_text: "savoury",
	            answer_id: 2,
	            answer_tag_category: "type",
	            answer_tag: "savoury"
	          },
	          { answer_text: "spicy",
	            answer_id: 3,
	            answer_tag_category: "type",
	            answer_tag: "spicy"
	          },
	          { answer_text: "icy",
	            answer_id: 4,
	            answer_tag_category: "type",
	            answer_tag: "icy"
	          },
	      ]
  		}
		],
	},

	{
		category: "difficulty",
		questions: [
			{
				question_id: 2,
	      question_text: "My motto in the kitchen is...",
	      answer_options: [
	          { answer_text: "Go big or go home",
	            answer_id: 1,
	            answer_tag_category: "difficulty",
	            answer_tag: "challenging"
	          },
	          { answer_text: "Less is more",
	            answer_id: 2,
	            answer_tag_category: "difficulty",
	            answer_tag: "simple"
	          },
	          { answer_text: "A messy kitchen is a happy kitchen",
	            answer_id: 3,
	            answer_tag_category: "difficulty",
	            answer_tag: "time-consuming"
	          },
	          { answer_text: "Fake it till you make it",
	            answer_id: 4,
	            answer_tag_category: "difficulty",
	            answer_tag: "easy"
	          },
	      ]
	    },
	    {
	    	question_id: 3,
	      question_text: "Cooking is the best when...",
	      answer_options: [
	          { answer_text: "it’s quick and easy",
	            answer_id: 1,
	            answer_tag_category: "difficulty",
	            answer_tag: "easy"
	          },
	          { answer_text: "there is little to clean up",
	            answer_id: 2,
	            answer_tag_category: "difficulty",
	            answer_tag: "simple"
	          },
	          { answer_text: "it's challenging",
	            answer_id: 3,
	            answer_tag_category: "difficulty",
	            answer_tag: "time-consuming"
	          },
	          { answer_text: "Fake it till you make it",
	            answer_id: 4,
	            answer_tag_category: "difficulty",
	            answer_tag: "challenging"
	          },
	      ]
	    },
	    {
	    	question_id: 4,
	      question_text: "Who’s coming over?",
	      question_category: "difficulty",
	      next_question: 7,
	      answer_options: [
	          { answer_text: "The Queen",
	            answer_id: 1,
	            answer_tag_category: "difficulty",
	            answer_tag: "challenging"
	          },
	          { answer_text: "Winnie the Pooh",
	            answer_id: 2,
	            answer_tag_category: "difficulty",
	            answer_tag: "simple"
	          },
	          { answer_text: "Batman",
	            answer_id: 3,
	            answer_tag_category: "difficulty",
	            answer_tag: "easy"
	          },
	          { answer_text: "No one, I’m locking my door!",
	            answer_id: 4,
	            answer_tag_category: "difficulty",
	            answer_tag: "time-consuming"
	          },
	      ]
	    },
		]
	},

{
	category: "nutrition",
	questions: [
		{
			question_id: 5,
      question_text: "What do you crave?",
      answer_options: [
          { answer_text: "Food coma, here I come!",
            answer_id: 1,
            answer_tag_category: "nutrition",
            answer_tag: "unhealthy"
          },
          { answer_text: "Something light",
            answer_id: 2,
            answer_tag_category: "nutrition",
            answer_tag: "healthy"
          },
          { answer_text: "I don’t care, I’m hangry!",
            answer_id: 3,
            answer_tag_category: "nutrition",
            answer_tag: "unhealthy"
          },
          { answer_text: "Surprise me!",
            answer_id: 4,
            answer_tag_category: "nutrition",
            answer_tag: "healthy"
          },
      ]
		},
		{
			question_id: 6,
      question_text: "A nutritious meal is…",
      answer_options: [
          { answer_text: "the best kind of meal!",
            answer_id: 1,
            answer_tag_category: "nutrition",
            answer_tag: "healthy"
          },
          { answer_text: "a necessary evil.",
            answer_id: 2,
            answer_tag_category: "nutrition",
            answer_tag: "healthy"
          },
          { answer_text: "a bonus",
            answer_id: 3,
            answer_tag_category: "nutrition",
            answer_tag: "unhealthy"
          },
          { answer_text: "Not an option",
            answer_id: 4,
            answer_tag_category: "nutrition",
            answer_tag: "unhealthy"
          },
      ]
		}
	]
},

{
	category: "season",
	questions: [
		{
			question_id: 7,
      question_text: "I feel inspired by…",
      answer_options: [
          { answer_text: "autmn leaves",
            answer_id: 1,
            answer_tag_category: "season",
            answer_tag: "autmn"
          },
          { answer_text: "sunshine",
            answer_id: 2,
            answer_tag_category: "season",
            answer_tag: "spring"
          },
          { answer_text: "the beach",
            answer_id: 3,
            answer_tag_category: "season",
            answer_tag: "summer"
          },
          { answer_text: "friday nights",
            answer_id: 4,
            answer_tag_category: "season",
            answer_tag: "winter"
          },
      ]
		},
		{
			question_id: 8,
      question_text: "My secret ingredient is…",
      answer_options: [
          { answer_text: "love",
            answer_id: 1,
            answer_tag_category: "season",
            answer_tag: "spring"
          },
          { answer_text: "food delivery",
            answer_id: 2,
            answer_tag_category: "season",
            answer_tag: "autumn"
          },
          { answer_text: "a secret",
            answer_id: 3,
            answer_tag_category: "season",
            answer_tag: "summer"
          },
          { answer_text: "plenty of salt",
            answer_id: 4,
            answer_tag_category: "season",
            answer_tag: "winter"
          },
      ]
		},
		{
			question_id: 9,
      question_text: "Today’s soundtrack is…",
      answer_options: [
          { answer_text: "Hakuna Matata",
            answer_id: 1,
            answer_tag_category: "season",
            answer_tag: "summer"
          },
          { answer_text: "Don’t Stop Believing",
            answer_id: 2,
            answer_tag_category: "season",
            answer_tag: "spring"
          },
          { answer_text: "Ice Ice Baby",
            answer_id: 3,
            answer_tag_category: "season",
            answer_tag: "winter"
          },
          { answer_text: "All You Need Is Love",
            answer_id: 4,
            answer_tag_category: "season",
            answer_tag: "autmun"
          },
      ]
		}
	]
}
]


export default questionAnswerPairs
