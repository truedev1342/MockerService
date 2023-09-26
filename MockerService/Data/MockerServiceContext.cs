using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MockerService.Models;
using MockerService.Entities;

namespace MockerService.Data
{
    public class MockerServiceContext : DbContext
    {
        public MockerServiceContext(DbContextOptions<MockerServiceContext> options)
            : base(options)
        {
        }

        public DbSet<MockerService.Models.Project> Project { get; set; }
        public DbSet<FileDetails> FileDetails { get; set; }
    }
}
