using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizApi.Models
{
    public class Questions
    {
        [Key]
        public int QuestionId { get; set; }

        public string TextOfQuestion { get; set; }

        public string? ImageName { get; set; }

        public string Option1 { get; set; }

        public string Option2 { get; set; }

        public string Option3 { get; set; }
        public string Option4 { get; set; }
        public int Answer { get; set; }


    }
}
