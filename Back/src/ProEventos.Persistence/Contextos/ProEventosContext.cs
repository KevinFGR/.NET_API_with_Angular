using System.Reflection.PortableExecutable;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contextos
{
    public class ProEventosContext : DbContext
    {
        public ProEventosContext(DbContextOptions<ProEventosContext> options) : base(options){}

        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<PalestranteEvento> PalestrantesEventos { get; set; }
        public DbSet<RedeSocial> RedesSociais { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder){
       
        modelBuilder.Entity<PalestranteEvento>()
            .HasKey(PE => new {PE.EventoId, PE.PalestranteId});

        // É necessário adicionar o Delete em cascata para que ao deletar um evento, as linhas referentes a esse 
        // evento em outras tabelas também sejam apagadas
        modelBuilder.Entity<Evento>()
            .HasMany(e=>e.RedesSociais)
            .WithOne(rs=>rs.Evento)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Palestrante>()
            .HasMany(p=>p.RedesSociais)
            .WithOne(rs=>rs.Palestrante)
            .OnDelete(DeleteBehavior.Cascade);
            
        }
    }

}