namespace mutex.Types
{
    using mutex.Repositories;

    public class HumanCreatedEvent : HumanObject
    {
        public HumanCreatedEvent(IHumanRepository humanRepository)
            : base(humanRepository)
        {
        }
    }
}
