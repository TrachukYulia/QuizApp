using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizApi.Models
{
    public class Participant
    {
        [Key]
        public int ParticipantId { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; } 
        public int Score { get; set; }
        public int TimeTaken { get; set; }
    }
}
